using DentalClinicServer.DTOs;
using DentalClinicServer.DTOs.Master.Package;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicServer.Services.Master.Package;

public interface IPackageService {
    Task<PackageDto> GetPackage(int id);

    Task<(List<PackageDto> packageDtos, PaginationResultDto pagination)> GetPackages(
        [FromQuery] PaginationDto paginationDto
        , [FromQuery] QueryFilterDto filterDto
        , [FromQuery] QuerySortDto sortDto);
}
