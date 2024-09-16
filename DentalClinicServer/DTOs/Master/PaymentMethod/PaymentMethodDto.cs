namespace DentalClinicServer.DTOs.Master.PaymentMethod;

public class PaymentMethodDto {
    public int PaymentMethodId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
