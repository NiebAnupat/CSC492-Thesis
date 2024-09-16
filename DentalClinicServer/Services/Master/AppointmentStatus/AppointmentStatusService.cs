using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.AppointmentStatus;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.AppointmentStatus;

public class AppointmentStatusService : IAppointmentStatusService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public AppointmentStatusService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(AppointmentStatusService))
            : logger.ForContext("ServiceName", nameof(AppointmentStatusService));
    }


    public async Task<AppointmentStatusDto> GetAppointmentStatus(int id) {
        const string actionName = nameof(GetAppointmentStatus);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var appointmentStatus = await _dbContext.AppointmentStatuses.AsNoTracking()
            .FirstOrDefaultAsync(p => p.AppointmentStatusId == id);

        if (appointmentStatus is null) {
            throw new KeyNotFoundException($"AppointmentStatus with id {id} not found");
        }

        var appointmentStatusDto = _mapper.Map<AppointmentStatusDto>(appointmentStatus);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return appointmentStatusDto;
    }

    public async Task<(List<AppointmentStatusDto> appointmentStatusDtos, PaginationResultDto pagination)> GetAppointmentStatuses(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetAppointmentStatuses);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.AppointmentStatuses.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = await query.GetPagination(paginationDto, filterDto, sortDto);

        var appointmentStatus = await query.ToListAsync();
        var appointmentStatusDtos = _mapper.Map<List<AppointmentStatusDto>>(appointmentStatus);


        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return (appointmentStatusDtos, pagination);
    }
}
