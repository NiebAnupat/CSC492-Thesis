namespace DentalClinicServer.DTOs.Master.TreatmentRecordField;

public class TreatmentRecordFieldDto {
    public int TreatmentRecordFieldId { get; set; }
    public string NameInThai { get; set; } = null!;
    public string NameInEnglish { get; set; } = null!;
    public bool IsActive { get; set; }
}
