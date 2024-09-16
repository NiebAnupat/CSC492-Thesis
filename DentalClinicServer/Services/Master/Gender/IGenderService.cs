using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.Gender;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.Gender;

public interface IGenderService {
    Task<GenderDto> GetGender(int id);

    Task<(List<GenderDto> genderDtos, PaginationResultDto pagination)> GetGenders(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
