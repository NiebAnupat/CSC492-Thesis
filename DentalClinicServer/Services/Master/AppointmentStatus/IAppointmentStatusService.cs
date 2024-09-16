using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.AppointmentStatus;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.AppointmentStatus;

public interface IAppointmentStatusService {
    Task<AppointmentStatusDto> GetAppointmentStatus(int id);

    Task<(List<AppointmentStatusDto> appointmentStatusDtos, PaginationResultDto pagination)> GetAppointmentStatuses(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
