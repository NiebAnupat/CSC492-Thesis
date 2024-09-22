using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.District;

public class DistrictService : IDistrictService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public DistrictService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(DistrictService))
            : logger.ForContext("ServiceName", nameof(DistrictService));
    }


    public async Task<DistrictDtoIncludeDetail> GetDistrict(int id) {
        const string actionName = nameof(GetDistrict);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var district = await _dbContext.Districts
            .Include(p => p.SubDistricts).AsNoTracking()
            .FirstOrDefaultAsync(p => p.DistrictId == id);

        if (district is null) {
            throw new KeyNotFoundException($"District with id {id} not found");
        }

        var districtDto = _mapper.Map<DistrictDtoIncludeDetail>(district);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return districtDto;
    }

    public async Task<(List<DistrictDto> districtDtos, PaginationResultDto pagination)> GetDistricts(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetDistricts);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.Districts.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var district = await query.ToListAsync();
        var districtDtos = _mapper.Map<List<DistrictDto>>(district);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (districtDtos, pagination);
    }
}
