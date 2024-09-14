using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.DTOs.Master.Province;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.Province;

public class ProvinceService : ServiceBase, IProvinceService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;
    private readonly HttpContext? _httpContext;

    public ProvinceService(AppDBContext dbContext,
        IMapper mapper, IHttpContextAccessor httpContext,
        Serilog.ILogger? logger = null) : base(dbContext, mapper, httpContext) {
        _dbContext = dbContext;
        _mapper = mapper;
        _httpContext = httpContext.HttpContext;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(ProvinceService))
            : logger.ForContext("ServiceName", nameof(ProvinceService));
    }


    public async Task<List<ProvinceDto>> GetProvinces() {
        const string actionName = nameof(GetProvinces);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var provinces = await _dbContext.Provinces
            // .Include(p => p.Districts)
            .AsNoTracking()
            .ToListAsync();

        var provinceDtos = _mapper.Map<List<ProvinceDto>>(provinces);

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
        return provinceDtos;
    }

    public async Task<ProvinceDto> GetProvince(int id) {
        const string actionName = nameof(GetProvince);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        throw new NotImplementedException();
    }
}
