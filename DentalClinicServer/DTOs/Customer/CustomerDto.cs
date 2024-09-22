using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.DTOs.Master.Gender;
using DentalClinicServer.DTOs.Master.ProviderType;
using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.DTOs.Master.SubDistrict;

namespace DentalClinicServer.DTOs.Customer;

public class CustomerDto {
    public string CustomerId { get; set; }

    public int ProviderTypeId { get; set; }

    public string? CustomerProviderId { get; set; }

    public string Email { get; set; }

    public int GenderId { get; set; }

    public string? Nationality { get; set; }

    public string? CitizenId { get; set; }

    public string Prefix { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Telephone { get; set; }

    public string AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public int ProvinceId { get; set; }

    public int DistrictId { get; set; }

    public int SubDistrictId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public bool IsActive { get; set; }
}

public class CustomerDtoIncludeDetail : CustomerDto {
    public ProvinceDto Province { get; set; }
    public DistrictDto District { get; set; }
    public SubDistrictDto SubDistrict { get; set; }

    public ProviderTypeDto ProviderType { get; set; }
    public GenderDto Gender { get; set; }
}

public class CustomerRequestDto {
    public Guid? CustomerId { get; set; } = Guid.NewGuid();
    public string? CustomerProviderId { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string? Nationality { get; set; }
    public string? CitizenId { get; set; }
    public string Prefix { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Telephone { get; set; }
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public int ProvinceId { get; set; }
    public int DistrictId { get; set; }
    public int SubDistrictId { get; set; }
    public int ProviderTypeId { get; set; }
    public int GenderId { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateCustomerRequestDto {
    public string? CustomerProviderId { get; set; }
    public string? National { get; set; }
    public string? CitizenId { get; set; }
    public string Prefix { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Telephone { get; set; }
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public int ProvinceId { get; set; }
    public int DistrictId { get; set; }
    public int SubDistrictId { get; set; }
    public int ProviderTypeId { get; set; }
    public int GenderId { get; set; }
    public bool IsActive { get; set; }
}
