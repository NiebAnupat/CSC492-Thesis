using DentalClinicServer.DTOs.Master.District;
using DentalClinicServer.DTOs.Master.Gender;
using DentalClinicServer.DTOs.Master.ProviderType;
using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.DTOs.Master.SubDistrict;

namespace DentalClinicServer.DTOs.Customer;

public class CustomerDto {
    public string CustomerId { get; set; } = null!;

    public int ProviderTypeId { get; set; }

    public string? CustomerProviderId { get; set; }

    public string Email { get; set; } = null!;

    public int GenderId { get; set; }

    public string? Nationality { get; set; }

    public string? CitizenId { get; set; }

    public string Prefix { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Telephone { get; set; } = null!;

    public string AddressLine1 { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public int ProvinceId { get; set; }

    public int DistrictId { get; set; }

    public int SubDistrictId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public bool IsActive { get; set; }
}

public class CustomerDtoIncludeDetail : CustomerDto {
    public ProvinceDto Province { get; set; } = null!;
    public DistrictDto District { get; set; } = null!;
    public SubDistrictDto SubDistrict { get; set; } = null!;

    public ProviderTypeDto ProviderType { get; set; } = null!;
    public GenderDto Gender { get; set; } = null!;
}

public class CustomerRequestDto {
    public string? CustomerProviderId { get; set; }
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? Nationality { get; set; }
    public string? CitizenId { get; set; }
    public string Prefix { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Telephone { get; set; } = null!;
    public string AddressLine1 { get; set; } = null!;
    public string? AddressLine2 { get; set; }
    public int ProvinceId { get; set; }
    public int DistrictId { get; set; }
    public int SubDistrictId { get; set; }
    public int ProviderTypeId { get; set; }
    public int GenderId { get; set; }
}

public class CustomerResponseDto {
    public string CustomerId { get; set; }
    public string Email { get; set; }
    public string? National { get; set; }
    public string? CitizenId { get; set; }
    public string Prefix { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Telephone { get; set; }
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public ProvinceDto Province { get; set; }
    public DistrictDto District { get; set; }
    public SubDistrictDto SubDistrict { get; set; }
    public ProviderTypeDto ProviderType { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdateCustomerRequestDto {
    public string? CustomerProviderId { get; set; }
    public string Email { get; set; }
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

public class UpdateCustomerResponseDto {
    public string CustomerId { get; set; }
    public string Email { get; set; }
    public string? National { get; set; }
    public string? CitizenId { get; set; }
    public string Prefix { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Telephone { get; set; }
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public ProvinceDto Province { get; set; }
    public DistrictDto District { get; set; }
    public SubDistrictDto SubDistrict { get; set; }
    public ProviderTypeDto ProviderType { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsActive { get; set; }
}

public class DeleteCustomerResponseDto {
    public string CustomerId { get; set; } = null!;

    public int ProviderTypeId { get; set; }

    public string? CustomerProviderId { get; set; }

    public string Email { get; set; } = null!;

    public int GenderId { get; set; }

    public string? Nationality { get; set; }

    public string? CitizenId { get; set; }

    public string Prefix { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Telephone { get; set; } = null!;

    public string AddressLine1 { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public int ProvinceId { get; set; }

    public int DistrictId { get; set; }

    public int SubDistrictId { get; set; }

    public DateTime UpdatedAt { get; set; }
    public bool IsActive { get; set; }
}
