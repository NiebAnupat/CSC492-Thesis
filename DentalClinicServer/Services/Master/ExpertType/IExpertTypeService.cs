using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.ExpertType;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.ExpertType;

public interface IExpertTypeService {
    Task<ExpertTypeDto> GetExpertType(int id);

    Task<(List<ExpertTypeDto> expertTypeDtos, PaginationResultDto pagination)> GetExpertTypes(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
