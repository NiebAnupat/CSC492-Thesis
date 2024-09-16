using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.District;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.District;

public interface IDistrictService {
    Task<DistrictDtoIncludeDetail> GetDistrict(int id);

    Task<(List<DistrictDto> districtDtos, PaginationResultDto pagination)> GetDistricts(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
