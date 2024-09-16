namespace DentalClinicServer.DTOs.Master.StockType;

public class StockTypeDto {
    public int StockTypeId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
