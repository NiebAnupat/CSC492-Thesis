using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.Package;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.Package;

public class PackageService : IPackageService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public PackageService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(PackageService))
            : logger.ForContext("ServiceName", nameof(PackageService));
    }


    public async Task<PackageDto> GetPackage(int id) {
        const string actionName = nameof(GetPackage);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var package = await _dbContext.Packages.AsNoTracking()
            .FirstOrDefaultAsync(p => p.PackageId == id);

        if (package is null) {
            throw new KeyNotFoundException($"Package with id {id} not found");
        }

        var packageDto = _mapper.Map<PackageDto>(package);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return packageDto;
    }

    public async Task<(List<PackageDto> packageDtos, PaginationResultDto pagination)> GetPackages(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetPackages);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.Packages.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var package = await query.ToListAsync();
        var packageDtos = _mapper.Map<List<PackageDto>>(package);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (packageDtos, pagination);
    }
}
