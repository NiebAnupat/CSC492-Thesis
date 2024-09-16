using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.PaymentStatus;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.PaymentStatus;

public interface IPaymentStatusService {
    Task<PaymentStatusDto> GetPaymentStatus(int id);

    Task<(List<PaymentStatusDto> paymentStatusDtos, PaginationResultDto pagination)> GetPaymentStatuses(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
