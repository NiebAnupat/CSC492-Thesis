using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Customer;
using DentalClinicServer.Exceptions;
using DentalClinicServer.Models;
using DentalClinicServer.Services.Customer;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase {
    private readonly ICustomerService _customerService;
    private readonly Serilog.ILogger? _logger;

    public CustomerController(ICustomerService customerService, Serilog.ILogger? logger = null) {
        _customerService = customerService;
        _logger = logger is null
            ? Serilog.Log.ForContext<CustomerController>()
            : logger.ForContext<CustomerController>();
    }

    /// <summary>
    /// สร้างข้อมูลลูกค้า เฉพาะการสมัครสมาชิกผ่านแพลตฟอร์ม (ProviderTypeId = 1)
    /// </summary>
    /// <param name="requestDto"></param>
    /// <returns>เพิ่มข้อมูลลูกค้าสำเร็จ</returns>
    [HttpPost]
    public ServiceResponse<string> CreateCustomer(CustomerRequestDto requestDto) {
        const string actionName = nameof(CreateCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        try {
            var massage = _customerService.CreateCustomer(requestDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

            return ResponseResult.Success("", massage);
        }
        catch (Exception e) {
            _logger.Error(e, "[{ActionName}] - Failed : {date}", actionName, DateTime.Now);
            throw;
        }
    }

    [HttpPut("{id}")]
    public ServiceResponse<string> UpdateCustomer(string id,
        UpdateCustomerRequestDto updateDto) {
        const string actionName = nameof(UpdateCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        try {
            var massage = _customerService.UpdateCustomer(id, updateDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

            return ResponseResult.Success("", massage);
        }
        catch (Exception e) {
            _logger.Error(e, "[{ActionName}] - Failed : {date}", actionName, DateTime.Now);
            throw;
        }
    }

    [HttpDelete("{id}")]
    public ServiceResponse<string> DeleteCustomer(string id) {
        const string actionName = nameof(DeleteCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        try {
            var massage = _customerService.DeleteCustomer(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

            return ResponseResult.Success("", massage);
        }
        catch (Exception e) {
            _logger.Error(e, "[{ActionName}] - Failed : {date}", actionName, DateTime.Now);
            throw;
        }
    }

    [HttpGet("{id}")]
    public ServiceResponse<CustomerDto> GetCustomer(string id) {
        const string actionName = nameof(GetCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        try {
            var dto = _customerService.GetCustomer(id);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

            return ResponseResult.Success(dto);
        }
        catch (Exception e) {
            _logger.Error(e, "[{ActionName}] - Failed : {date}", actionName, DateTime.Now);
            throw;
        }
    }

    [HttpGet]
    public ServiceResponse<List<CustomerDto>> GetCustomers(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto) {
        const string actionName = nameof(GetCustomers);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);
        try {
            var result = _customerService.GetCustomers(paginationDto, filterDto, sortDto);

            _logger.Debug("[{ActionName}] - Success : {date}", actionName, DateTime.Now);

            return ResponseResult.Success(result.dtos, result.pagination);
        }
        catch (Exception e) {
            _logger.Error(e, "[{ActionName}] - Failed : {date}", actionName, DateTime.Now);
            throw;
        }
    }
}
