using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.StockType;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.StockType;

public class StockTypeService : IStockTypeService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public StockTypeService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(StockTypeService))
            : logger.ForContext("ServiceName", nameof(StockTypeService));
    }


    public async Task<StockTypeDto> GetStockType(int id) {
        const string actionName = nameof(GetStockType);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var stockType = await _dbContext.StockTypes.AsNoTracking()
            .FirstOrDefaultAsync(p => p.StockTypeId == id);

        if (stockType is null) {
            throw new KeyNotFoundException($"StockType with id {id} not found");
        }

        var stockTypeDto = _mapper.Map<StockTypeDto>(stockType);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return stockTypeDto;
    }

    public async Task<(List<StockTypeDto> stockTypeDtos, PaginationResultDto pagination)> GetStockTypes(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetStockTypes);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.StockTypes.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = await query.GetPagination(paginationDto, filterDto, sortDto);

        var stockType = await query.ToListAsync();
        var stockTypeDtos = _mapper.Map<List<StockTypeDto>>(stockType);


        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return (stockTypeDtos, pagination);
    }
}
