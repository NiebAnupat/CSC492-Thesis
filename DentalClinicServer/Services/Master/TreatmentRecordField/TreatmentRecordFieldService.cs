using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.TreatmentRecordField;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.TreatmentRecordField;

public class TreatmentRecordFieldService : ITreatmentRecordFieldService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public TreatmentRecordFieldService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(TreatmentRecordFieldService))
            : logger.ForContext("ServiceName", nameof(TreatmentRecordFieldService));
    }


    public async Task<TreatmentRecordFieldDto> GetTreatmentRecordField(int id) {
        const string actionName = nameof(GetTreatmentRecordField);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var treatmentRecordField = await _dbContext.TreatmentRecordFields.AsNoTracking()
            .FirstOrDefaultAsync(p => p.TreatmentRecordFieldId == id);

        if (treatmentRecordField is null) {
            throw new KeyNotFoundException($"TreatmentRecordField with id {id} not found");
        }

        var treatmentRecordFieldDto = _mapper.Map<TreatmentRecordFieldDto>(treatmentRecordField);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return treatmentRecordFieldDto;
    }

    public async Task<(List<TreatmentRecordFieldDto> treatmentRecordFieldDtos, PaginationResultDto pagination)> GetTreatmentRecordFields(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetTreatmentRecordFields);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.TreatmentRecordFields.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var treatmentRecordField = await query.ToListAsync();
        var treatmentRecordFieldDtos = _mapper.Map<List<TreatmentRecordFieldDto>>(treatmentRecordField);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (treatmentRecordFieldDtos, pagination);
    }
}
