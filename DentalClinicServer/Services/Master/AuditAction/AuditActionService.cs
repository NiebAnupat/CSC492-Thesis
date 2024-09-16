using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.AuditAction;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.AuditAction;

public class AuditActionService : IAuditActionService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public AuditActionService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(AuditActionService))
            : logger.ForContext("ServiceName", nameof(AuditActionService));
    }


    public async Task<AuditActionDto> GetAuditAction(int id) {
        const string actionName = nameof(GetAuditAction);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var auditAction = await _dbContext.AuditActions.AsNoTracking()
            .FirstOrDefaultAsync(p => p.AuditActionId == id);

        if (auditAction is null) {
            throw new KeyNotFoundException($"AuditAction with id {id} not found");
        }

        var auditActionDto = _mapper.Map<AuditActionDto>(auditAction);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return auditActionDto;
    }

    public async Task<(List<AuditActionDto> auditActionDtos, PaginationResultDto pagination)> GetAuditActions(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetAuditActions);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.AuditActions.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = await query.GetPagination(paginationDto, filterDto, sortDto);

        var auditAction = await query.ToListAsync();
        var auditActionDtos = _mapper.Map<List<AuditActionDto>>(auditAction);


        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return (auditActionDtos, pagination);
    }
}
