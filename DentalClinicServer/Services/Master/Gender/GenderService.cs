using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.Gender;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.Gender;

public class GenderService : IGenderService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public GenderService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(GenderService))
            : logger.ForContext("ServiceName", nameof(GenderService));
    }


    public async Task<GenderDto> GetGender(int id) {
        const string actionName = nameof(GetGender);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var gender = await _dbContext.Genders.AsNoTracking()
            .FirstOrDefaultAsync(p => p.GenderId == id);

        if (gender is null) {
            throw new KeyNotFoundException($"Gender with id {id} not found");
        }

        var genderDto = _mapper.Map<GenderDto>(gender);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return genderDto;
    }

    public async Task<(List<GenderDto> genderDtos, PaginationResultDto pagination)> GetGenders(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetGenders);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.Genders.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = await query.GetPagination(paginationDto, filterDto, sortDto);

        var gender = await query.ToListAsync();
        var genderDtos = _mapper.Map<List<GenderDto>>(gender);


        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return (genderDtos, pagination);
    }
}
