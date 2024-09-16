namespace DentalClinicServer.DTOs.Master.AppointmentStatus;

public class AppointmentStatusDto {
    public int AppointmentStatusId { get; set; }
    public string NameInThai { get; set; }
    public string NameInEnglish { get; set; }
    public bool IsActive { get; set; }
}
