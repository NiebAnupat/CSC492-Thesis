using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.AuditAction;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.AuditAction;

public interface IAuditActionService {
    Task<AuditActionDto> GetAuditAction(int id);

    Task<(List<AuditActionDto> auditActionDtos, PaginationResultDto pagination)> GetAuditActions(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
