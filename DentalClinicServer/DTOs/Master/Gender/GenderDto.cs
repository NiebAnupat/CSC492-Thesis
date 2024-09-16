namespace DentalClinicServer.DTOs.Master.Gender;

public class GenderDto {
    public int GenderId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
