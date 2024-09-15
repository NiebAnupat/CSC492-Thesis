using DentalClinicServer.DTOs.Master.District;

namespace DentalClinicServer.DTOs.Master.Province;

public class ProvinceDto {
    public int ProvinceId { get; set; }
    public int Code { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

}

public class ProvinceDtoIncludeDetails {
    public int ProvinceId { get; set; }
    public int Code { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public List<DistrictDto>? Districts { get; set; }
}
