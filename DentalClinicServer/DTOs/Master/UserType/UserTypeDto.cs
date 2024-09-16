namespace DentalClinicServer.DTOs.Master.UserType;

public class UserTypeDto {
    public int UserTypeId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
