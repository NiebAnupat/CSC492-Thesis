namespace DentalClinicServer.DTOs.Master.AuditAction;

public class AuditActionDto {
    public int AuditActionId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
