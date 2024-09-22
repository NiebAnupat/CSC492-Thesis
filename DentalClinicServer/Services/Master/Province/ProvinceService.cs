using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.Province;

public class ProvinceService : IProvinceService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public ProvinceService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(ProvinceService))
            : logger.ForContext("ServiceName", nameof(ProvinceService));
    }


    public async Task<ProvinceDtoIncludeDetail> GetProvince(int id) {
        const string actionName = nameof(GetProvince);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var province = await _dbContext.Provinces
            .Include(p => p.Districts).AsNoTracking()
            .FirstOrDefaultAsync(p => p.ProvinceId == id);

        if (province is null) {
            throw new KeyNotFoundException($"Province with id {id} not found");
        }

        var provinceDto = _mapper.Map<ProvinceDtoIncludeDetail>(province);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return provinceDto;
    }

    public async Task<(List<ProvinceDto> provinceDtos, PaginationResultDto pagination)> GetProvinces(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetProvinces);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.Provinces.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var provinces = await query.ToListAsync();
        var provinceDtos = _mapper.Map<List<ProvinceDto>>(provinces);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (provinceDtos, pagination);
    }
}
