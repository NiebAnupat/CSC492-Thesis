namespace DentalClinicServer.DTOs.Master.PaymentStatus;

public class PaymentStatusDto {
    public int PaymentStatusId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
