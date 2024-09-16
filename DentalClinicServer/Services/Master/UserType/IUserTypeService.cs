using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.UserType;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.UserType;

public interface IUserTypeService {
    Task<UserTypeDto> GetUserType(int id);

    Task<(List<UserTypeDto> userTypeDtos, PaginationResultDto pagination)> GetUserTypes(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
