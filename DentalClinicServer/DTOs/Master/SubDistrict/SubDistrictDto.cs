using DentalClinicServer.DTOs.Master.District;

namespace DentalClinicServer.DTOs.Master.SubDistrict;

public class SubDistrictDto {
    public int SubDistrictId { get; set; }
    public int Code { get; set; }
    public string NameInThai { get; set; }
    public string? NameInEnglish { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public string? ZipCode { get; set; }
    public bool IsActive { get; set; }
}
