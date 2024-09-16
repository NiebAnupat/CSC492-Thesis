using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.ProviderType;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.ProviderType;

public interface IProviderTypeService {
    Task<ProviderTypeDto> GetProviderType(int id);

    Task<(List<ProviderTypeDto> providerTypeDtos, PaginationResultDto pagination)> GetProviderTypes(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
