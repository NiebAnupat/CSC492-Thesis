using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.Province;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.Province;

public interface IProvinceService {
    Task<ProvinceDtoIncludeDetail> GetProvince(int id);

    Task<(List<ProvinceDto> provinceDtos, PaginationResultDto pagination)> GetProvinces(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
