namespace DentalClinicServer.DTOs.Master.PaymentMethod;

public class PaymentMethodDto {
    public int PaymentMethodId { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
}
