using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Customer;
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


    [HttpPost]
    public async Task<ServiceResponse<CustomerResponseDto>> CreateCustomer(CustomerRequestDto requestDto) {
        const string actionName = nameof(CreateCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var responseDto = await _customerService.CreateCustomer(requestDto);

        if (responseDto is null) {
            _logger.Error("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
            return ResponseResult.Failure<CustomerResponseDto>("Failed to create customer");
        }

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);

        return ResponseResult.Success(responseDto);
    }

    [HttpPut("{id}")]
    public async Task<ServiceResponse<UpdateCustomerResponseDto>> UpdateCustomer(string id,
        UpdateCustomerRequestDto updateDto) {
        const string actionName = nameof(UpdateCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var responseDto = await _customerService.UpdateCustomer(id, updateDto);

        if (responseDto is null) {
            _logger.Error("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
            return ResponseResult.Failure<UpdateCustomerResponseDto>("Failed to update customer");
        }

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);

        return ResponseResult.Success(responseDto);
    }

    [HttpDelete("{id}")]
    public async Task<ServiceResponse<DeleteCustomerResponseDto>> DeleteCustomer(string id) {
        const string actionName = nameof(DeleteCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var responseDto = await _customerService.DeleteCustomer(id);

        if (responseDto is null) {
            _logger.Error("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
            return ResponseResult.Failure<DeleteCustomerResponseDto>("Failed to delete customer");
        }

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);

        return ResponseResult.Success(responseDto);
    }

    [HttpGet("{id}")]
    public async Task<ServiceResponse<CustomerDto>> GetCustomer(string id) {
        const string actionName = nameof(GetCustomer);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var responseDto = await _customerService.GetCustomer(id);

        if (responseDto is null) {
            _logger.Error("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
            return ResponseResult.Failure<CustomerDto>("Failed to get customer");
        }

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);

        return ResponseResult.Success(responseDto);
    }

    [HttpGet]
    public async Task<ServiceResponse<List<CustomerDto>>> GetCustomers(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto) {
        const string actionName = nameof(GetCustomers);
        _logger.Debug("[{ActionName}] - Started : {date}", actionName, DateTime.Now);

        var responseDto = await _customerService.GetCustomers(paginationDto, filterDto, sortDto);

        if (responseDto.customerDtos is null) {
            _logger.Error("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);
            return ResponseResult.Failure<List<CustomerDto>>("Failed to get customers");
        }

        _logger.Debug("[{ActionName}] - Ended : {date}", actionName, DateTime.Now);

        return ResponseResult.Success(responseDto.customerDtos, responseDto.pagination);
    }
}
