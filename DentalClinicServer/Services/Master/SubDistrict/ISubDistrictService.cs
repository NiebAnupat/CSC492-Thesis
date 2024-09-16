using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.SubDistrict;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.SubDistrict;

public interface ISubDistrictService {
    Task<SubDistrictDto> GetSubDistrict(int id);

    Task<(List<SubDistrictDto> subDistrictDtos, PaginationResultDto pagination)> GetSubDistricts(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
