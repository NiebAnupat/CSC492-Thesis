using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Customer;
using DentalClinicServer.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Customer;

public interface ICustomerService {
    string CreateCustomer(CustomerRequestDto requestDto);

    string UpdateCustomer(string id, UpdateCustomerRequestDto updateDto);

    string DeleteCustomer(string id);

    CustomerDto GetCustomer(string id);

    (List<CustomerDto> dtos, PaginationResultDto pagination) GetCustomers(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);

    Models.Customer FindCustomer(string id, bool noTracking = false);
    bool IsCustomerExist(string id);
}
