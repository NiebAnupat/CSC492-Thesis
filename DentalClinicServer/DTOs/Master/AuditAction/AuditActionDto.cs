namespace DentalClinicServer.DTOs.Master.AuditAction;

public class AuditActionDto {
    public int AuditActionId { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
}
