using DentalClinicServer.DTOs.Master.Province;

namespace DentalClinicServer.DTOs.Master.District;

public class DistrictDto {
    public string DistrictId { get; set; }
    public int Code { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public string ProvinceId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ProvinceDto Province { get; set; }
    // public List<SubDistrictDto>? SubDistricts { get; set; }
}
