using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.PaymentMethod;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.PaymentMethod;

public interface IPaymentMethodService {
    Task<PaymentMethodDto> GetPaymentMethod(int id);

    Task<(List<PaymentMethodDto> paymentMethodDtos, PaginationResultDto pagination)> GetPaymentMethods(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
