using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Customer;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Customer;

public interface ICustomerService {
    Task<CustomerResponseDto> CreateCustomer(CustomerRequestDto requestDto);

    Task<UpdateCustomerResponseDto> UpdateCustomer(string id, UpdateCustomerRequestDto updateDto);

    Task<DeleteCustomerResponseDto> DeleteCustomer(string id);

    Task<CustomerDto> GetCustomer(string id);

    Task<(List<CustomerDto> customerDtos, PaginationResultDto pagination)> GetCustomers(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
