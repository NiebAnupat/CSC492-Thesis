namespace DentalClinicServer.DTOs.Master.AppointmentStatus;

public class AppointmentStatusDto {
    public int AppointmentStatusId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
