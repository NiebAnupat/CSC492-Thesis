namespace DentalClinicServer.DTOs.Master.Package;

public class PackageDto {
    public int PackageId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public double Price { get; set; }
    public bool IsActive { get; set; }
}
