using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.PaymentMethod;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.PaymentMethod;

public class PaymentMethodService : IPaymentMethodService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public PaymentMethodService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(PaymentMethodService))
            : logger.ForContext("ServiceName", nameof(PaymentMethodService));
    }


    public async Task<PaymentMethodDto> GetPaymentMethod(int id) {
        const string actionName = nameof(GetPaymentMethod);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var paymentMethod = await _dbContext.PaymentMethods.AsNoTracking()
            .FirstOrDefaultAsync(p => p.PaymentMethodId == id);

        if (paymentMethod is null) {
            throw new KeyNotFoundException($"PaymentMethod with id {id} not found");
        }

        var paymentMethodDto = _mapper.Map<PaymentMethodDto>(paymentMethod);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return paymentMethodDto;
    }

    public async Task<(List<PaymentMethodDto> paymentMethodDtos, PaginationResultDto pagination)> GetPaymentMethods(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetPaymentMethods);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.PaymentMethods.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = await query.GetPagination(paginationDto, filterDto, sortDto);

        var paymentMethod = await query.ToListAsync();
        var paymentMethodDtos = _mapper.Map<List<PaymentMethodDto>>(paymentMethod);


        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return (paymentMethodDtos, pagination);
    }
}
