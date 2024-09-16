namespace DentalClinicServer.DTOs.Master.ProviderType;

public class ProviderTypeDto {
    public int ProviderTypeId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
