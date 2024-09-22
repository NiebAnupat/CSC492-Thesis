using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.ProviderType;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.ProviderType;

public class ProviderTypeService : IProviderTypeService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public ProviderTypeService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(ProviderTypeService))
            : logger.ForContext("ServiceName", nameof(ProviderTypeService));
    }


    public async Task<ProviderTypeDto> GetProviderType(int id) {
        const string actionName = nameof(GetProviderType);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var providerType = await _dbContext.ProviderTypes.AsNoTracking()
            .FirstOrDefaultAsync(p => p.ProviderTypeId == id);

        if (providerType is null) {
            throw new KeyNotFoundException($"ProviderType with id {id} not found");
        }

        var providerTypeDto = _mapper.Map<ProviderTypeDto>(providerType);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return providerTypeDto;
    }

    public async Task<(List<ProviderTypeDto> providerTypeDtos, PaginationResultDto pagination)> GetProviderTypes(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetProviderTypes);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.ProviderTypes.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var providerType = await query.ToListAsync();
        var providerTypeDtos = _mapper.Map<List<ProviderTypeDto>>(providerType);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (providerTypeDtos, pagination);
    }
}
