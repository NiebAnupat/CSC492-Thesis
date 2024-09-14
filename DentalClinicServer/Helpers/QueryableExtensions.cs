using DentalClinicServer.DTOs;

namespace DentalClinicServer.Helpers {
    public static class QueryableExtensions {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDto pagination) {
            return queryable.Skip((pagination.Page - 1) * pagination.RecordsPerPage).Take(pagination.RecordsPerPage);
        }
    }
}