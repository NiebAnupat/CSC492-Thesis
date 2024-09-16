namespace DentalClinicServer.DTOs.Master.ExpertType;

public class ExpertTypeDto {
    public int ExpertTypeId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
