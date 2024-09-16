namespace DentalClinicServer.DTOs.Master.UserType;

public class UserTypeDto {
    public int UserTypeId { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
}
