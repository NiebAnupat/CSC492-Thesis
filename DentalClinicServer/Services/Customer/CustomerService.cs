using AutoMapper;
using DentalClinicServer.Data;
using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Customer;

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

    public async Task<CustomerResponseDto> CreateCustomer(CustomerRequestDto requestDto) {
        throw new NotImplementedException();
    }

    public async Task<UpdateCustomerResponseDto> UpdateCustomer(string id, UpdateCustomerRequestDto updateDto) {
        throw new NotImplementedException();
    }

    public async Task<DeleteCustomerResponseDto> DeleteCustomer(string id) {
        throw new NotImplementedException();
    }

    public async Task<CustomerDto> GetCustomer(string id) {
        throw new NotImplementedException();
    }

    public async Task<(List<CustomerDto> customerDtos, PaginationResultDto pagination)> GetCustomers(
        PaginationDto paginationDto, QueryFilterDto filterDto, QuerySortDto sortDto) {
        throw new NotImplementedException();
    }
}
