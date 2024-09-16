using DentalClinicServer.DTOs.Master.Province;
using DentalClinicServer.DTOs.Master.SubDistrict;

namespace DentalClinicServer.DTOs.Master.District;

public class DistrictDto {
    public string DistrictId { get; set; }
    public int Code { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
}

public class DistrictDtoIncludeDetail {
    public string DistrictId { get; set; }
    public int Code { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }

    public List<SubDistrictDto>? SubDistricts { get; set; }
}
