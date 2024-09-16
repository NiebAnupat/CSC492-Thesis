using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.TreatmentRecordField;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.TreatmentRecordField;

public interface ITreatmentRecordFieldService {
    Task<TreatmentRecordFieldDto> GetTreatmentRecordField(int id);

    Task<(List<TreatmentRecordFieldDto> treatmentRecordFieldDtos, PaginationResultDto pagination)> GetTreatmentRecordFields(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
