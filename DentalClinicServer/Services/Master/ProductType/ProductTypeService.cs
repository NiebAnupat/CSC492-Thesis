using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.ProductType;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.ProductType;

public class ProductTypeService : IProductTypeService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public ProductTypeService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(ProductTypeService))
            : logger.ForContext("ServiceName", nameof(ProductTypeService));
    }


    public async Task<ProductTypeDto> GetProductType(int id) {
        const string actionName = nameof(GetProductType);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var productType = await _dbContext.ProductTypes.AsNoTracking()
            .FirstOrDefaultAsync(p => p.ProductTypeId == id);

        if (productType is null) {
            throw new KeyNotFoundException($"ProductType with id {id} not found");
        }

        var productTypeDto = _mapper.Map<ProductTypeDto>(productType);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return productTypeDto;
    }

    public async Task<(List<ProductTypeDto> productTypeDtos, PaginationResultDto pagination)> GetProductTypes(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetProductTypes);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.ProductTypes.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = await query.GetPagination(paginationDto, filterDto, sortDto);

        var productType = await query.ToListAsync();
        var productTypeDtos = _mapper.Map<List<ProductTypeDto>>(productType);


        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return (productTypeDtos, pagination);
    }
}
