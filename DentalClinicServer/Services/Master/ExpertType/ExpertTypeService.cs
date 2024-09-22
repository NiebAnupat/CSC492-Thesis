using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.ExpertType;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.ExpertType;

public class ExpertTypeService : IExpertTypeService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public ExpertTypeService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(ExpertTypeService))
            : logger.ForContext("ServiceName", nameof(ExpertTypeService));
    }


    public async Task<ExpertTypeDto> GetExpertType(int id) {
        const string actionName = nameof(GetExpertType);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var expertType = await _dbContext.ExpertTypes.AsNoTracking()
            .FirstOrDefaultAsync(p => p.ExpertTypeId == id);

        if (expertType is null) {
            throw new KeyNotFoundException($"ExpertType with id {id} not found");
        }

        var expertTypeDto = _mapper.Map<ExpertTypeDto>(expertType);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return expertTypeDto;
    }

    public async Task<(List<ExpertTypeDto> expertTypeDtos, PaginationResultDto pagination)> GetExpertTypes(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetExpertTypes);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.ExpertTypes.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var expertType = await query.ToListAsync();
        var expertTypeDtos = _mapper.Map<List<ExpertTypeDto>>(expertType);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (expertTypeDtos, pagination);
    }
}
