using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.SubDistrict;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.SubDistrict;

public class SubDistrictService : ISubDistrictService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public SubDistrictService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(SubDistrictService))
            : logger.ForContext("ServiceName", nameof(SubDistrictService));
    }


    public async Task<SubDistrictDto> GetSubDistrict(int id) {
        const string actionName = nameof(GetSubDistrict);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var subDistrict = await _dbContext.SubDistricts.AsNoTracking()
            .FirstOrDefaultAsync(p => p.SubDistrictId == id);

        if (subDistrict is null) {
            throw new KeyNotFoundException($"SubDistrict with id {id} not found");
        }

        var subDistrictDto = _mapper.Map<SubDistrictDto>(subDistrict);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return subDistrictDto;
    }

    public async Task<(List<SubDistrictDto> subDistrictDtos, PaginationResultDto pagination)> GetSubDistricts(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetSubDistricts);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.SubDistricts.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var subDistrict = await query.ToListAsync();
        var subDistrictDtos = _mapper.Map<List<SubDistrictDto>>(subDistrict);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (subDistrictDtos, pagination);
    }
}
