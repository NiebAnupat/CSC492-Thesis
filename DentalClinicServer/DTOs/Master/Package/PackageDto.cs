namespace DentalClinicServer.DTOs.Master.Package;

public class PackageDto {
    public int PackageId { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public double Price { get; set; }
    public bool IsActive { get; set; }
}
