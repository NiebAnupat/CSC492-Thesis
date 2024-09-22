using System.Linq.Dynamic.Core;
using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Customer;
using DentalClinicServer.Exceptions;
using DentalClinicServer.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Services.Customer;

public class CustomerService : ICustomerService {
    private readonly AppDBContext _dbContext;
    private readonly IMapper _mapper;
    private readonly Serilog.ILogger? _logger;

    public CustomerService(AppDBContext dbContext, IMapper mapper, Serilog.ILogger? logger = null) {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger is null
            ? Serilog.Log.ForContext<CustomerService>()
            : logger.ForContext<CustomerService>();
    }

    public string CreateCustomer(CustomerRequestDto requestDto) {
        const string actionName = nameof(CreateCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);


        var isExist = IsCustomerExist(requestDto.Email);

        if (isExist) {
            throw new BadHttpRequestException("อีเมล์นี้มีอยู่ในระบบแล้ว");
        }

        requestDto.Password = Method.HashPassword(requestDto.Password);

        var customer = _mapper.Map<Models.Customer>(requestDto);

        _dbContext.Customers.Add(customer);
        _dbContext.SaveChanges();
        _logger.Debug("[{ActionName}] - SaveChanges : {date}", actionName, DateTime.Now);


        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

        return "เพิ่มข้อมูลลูกค้าสำเร็จ";
    }

    public string UpdateCustomer(string id, UpdateCustomerRequestDto updateDto) {
        const string actionName = nameof(UpdateCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var customer = FindCustomer(id);

        _mapper.Map(updateDto, customer);

        customer.UpdatedAt = DateTime.UtcNow;

        _dbContext.SaveChanges();
        _logger.Debug("[{ActionName}] - SaveChanges : {date}", actionName, DateTime.Now);

        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

        return "แก้ไขข้อมูลลูกค้าสำเร็จ";
    }

    public string DeleteCustomer(string id) {
        const string actionName = nameof(DeleteCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var customer = FindCustomer(id);

        // Soft delete
        customer.IsActive = false;
        customer.UpdatedAt = DateTime.UtcNow;

        _dbContext.SaveChanges();
        _logger.Debug("[{ActionName}] - SaveChanges : {date}", actionName, DateTime.Now);

        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

        return "ลบข้อมูลลูกค้าสำเร็จ";
    }

    public CustomerDto GetCustomer(string id) {
        const string actionName = nameof(GetCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var customer = FindCustomer(id);

        var dto = _mapper.Map<CustomerDto>(customer);

        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return dto;
    }

    public (List<CustomerDto> dtos, PaginationResultDto pagination) GetCustomers(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        const string actionName = nameof(GetCustomers);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.Customers.AsQueryable();

        if (paginationDto.IsActive.HasValue) {
            query = query.Where(c => c.IsActive == paginationDto.IsActive);
        }

        var (paginated, pagination) = query.GetPagination(paginationDto, filterDto, sortDto);

        if (paginated.Count() <= 0) {
            _logger.Warning("[{ActionName}] - NotFound : {date}", actionName, DateTime.Now);
            throw new NotFoundException("ไม่พบข้อมูลลูกค้า");
        }

        var dtos = _mapper.Map<List<CustomerDto>>(paginated);

        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

        return (dtos, pagination);
    }

    public Models.Customer FindCustomer(string id, bool noTracking = false) {
        const string actionName = nameof(FindCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var query = _dbContext.Customers.AsQueryable();
        if (noTracking) {
            query = query.AsNoTracking();
        }

        var customer = query.FirstOrDefault(c => c.CustomerId == id);
        if (customer is null) {
            _logger.Warning("[{ActionName}] - NotFound : {date}", actionName, DateTime.Now);
            throw new NotFoundException("ไม่พบข้อมูลลูกค้า");
        }

        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return customer;
    }

    public bool IsCustomerExist(string email) {
        const string actionName = nameof(IsCustomerExist);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var customer = _dbContext.Customers.AsNoTracking().FirstOrDefault(c => c.Email == email);
        if (customer is null) {
            return false;
        }

        _logger.Information("[{ActionName}] - Success : {date}", actionName, DateTime.Now);
        return true;
    }
}
