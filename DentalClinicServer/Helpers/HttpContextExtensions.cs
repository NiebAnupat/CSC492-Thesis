using DentalClinicServer.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Helpers {
    public static class HttpContextExtensions {
        public static async Task<PaginationResultDto> InsertPaginationParametersInResponse<T>(this HttpContext httpContext, IQueryable<T> queryable, int recordsPerPage, int currentPage) {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double totalAmountRecords = await queryable.CountAsync();
            double totalAmountPages = Math.Ceiling(totalAmountRecords / recordsPerPage);
            int pageIndex = currentPage - 1;

            PaginationResultDto resultDto = new PaginationResultDto() {
                TotalAmountRecords = totalAmountRecords,
                TotalAmountPages = totalAmountPages,
                CurrentPage = currentPage,
                RecordsPerPage = recordsPerPage,
                PageIndex = pageIndex
            };

            return resultDto;
        }
    }
}