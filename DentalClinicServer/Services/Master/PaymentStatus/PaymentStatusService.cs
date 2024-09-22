using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.PaymentStatus;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.PaymentStatus;

public class PaymentStatusService : IPaymentStatusService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public PaymentStatusService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(PaymentStatusService))
            : logger.ForContext("ServiceName", nameof(PaymentStatusService));
    }


    public async Task<PaymentStatusDto> GetPaymentStatus(int id) {
        const string actionName = nameof(GetPaymentStatus);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var paymentStatus = await _dbContext.PaymentStatuses.AsNoTracking()
            .FirstOrDefaultAsync(p => p.PaymentStatusId == id);

        if (paymentStatus is null) {
            throw new KeyNotFoundException($"PaymentStatus with id {id} not found");
        }

        var paymentStatusDto = _mapper.Map<PaymentStatusDto>(paymentStatus);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return paymentStatusDto;
    }

    public async Task<(List<PaymentStatusDto> paymentStatusDtos, PaginationResultDto pagination)> GetPaymentStatuses(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetPaymentStatuses);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.PaymentStatuses.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var paymentStatus = await query.ToListAsync();
        var paymentStatusDtos = _mapper.Map<List<PaymentStatusDto>>(paymentStatus);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (paymentStatusDtos, pagination);
    }
}
