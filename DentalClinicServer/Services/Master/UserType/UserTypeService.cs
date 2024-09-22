using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.UserType;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DentalClinicServer.Services.Master.UserType;

public class UserTypeService : IUserTypeService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger _logger;

    public UserTypeService(AppDBContext dbContext,
        IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Log.ForContext("ServiceName", nameof(UserTypeService))
            : logger.ForContext("ServiceName", nameof(UserTypeService));
    }


    public async Task<UserTypeDto> GetUserType(int id) {
        const string actionName = nameof(GetUserType);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        var userType = await _dbContext.UserTypes.AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserTypeId == id);

        if (userType is null) {
            throw new KeyNotFoundException($"UserType with id {id} not found");
        }

        var userTypeDto = _mapper.Map<UserTypeDto>(userType);

        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return userTypeDto;
    }

    public async Task<(List<UserTypeDto> userTypeDtos, PaginationResultDto pagination)> GetUserTypes(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetUserTypes);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.UserTypes.AsNoTracking();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(p => p.IsActive == paginationDto.IsActive);
        }

        (query, var pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        var userType = await query.ToListAsync();
        var userTypeDtos = _mapper.Map<List<UserTypeDto>>(userType);


        _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return (userTypeDtos, pagination);
    }
}
