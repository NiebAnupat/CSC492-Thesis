namespace DentalClinicServer.DTOs.Master.ProductType;

public class ProductTypeDto {
    public int ProductTypeId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
