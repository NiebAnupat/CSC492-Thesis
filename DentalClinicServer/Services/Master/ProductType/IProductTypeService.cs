using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.ProductType;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.ProductType;

public interface IProductTypeService {
    Task<ProductTypeDto> GetProductType(int id);

    Task<(List<ProductTypeDto> productTypeDtos, PaginationResultDto pagination)> GetProductTypes(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
