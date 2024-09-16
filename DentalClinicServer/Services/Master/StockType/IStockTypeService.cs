using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.StockType;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.StockType;

public interface IStockTypeService {
    Task<StockTypeDto> GetStockType(int id);

    Task<(List<StockTypeDto> stockTypeDtos, PaginationResultDto pagination)> GetStockTypes(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
