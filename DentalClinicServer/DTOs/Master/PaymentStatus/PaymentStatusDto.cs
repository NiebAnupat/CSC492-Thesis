namespace DentalClinicServer.DTOs.Master.PaymentStatus;

public class PaymentStatusDto {
    public int PaymentStatusId { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
}
