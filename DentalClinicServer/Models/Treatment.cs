﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Treatment")]
public partial class Treatment
{
    [Key]
    [Column(TypeName = "character varying")]
    public string TreatmentId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string PatientId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string DentistId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string BranchId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string? Subject { get; set; }

    public string? Objective { get; set; }

    public string? Assessment { get; set; }

    public string? Plan { get; set; }

    public DateOnly? RecallDate { get; set; }

    public bool IsNotifiedRecall { get; set; }

    public string? Remark { get; set; }

    /// <summary>
    /// Create date
    /// </summary>
    [Column(TypeName = "timestamp without time zone")]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Update date
    /// </summary>
    [Column(TypeName = "timestamp without time zone")]
    public DateTime UpdatedAt { get; set; }

    [Column(TypeName = "character varying")]
    public string CreatedByDentistId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string UpdatedByDentistId { get; set; } = null!;

    public bool IsActive { get; set; }

    [ForeignKey("BranchId")]
    [InverseProperty("Treatments")]
    public virtual Branch Branch { get; set; } = null!;

    [ForeignKey("CreatedByDentistId")]
    [InverseProperty("TreatmentCreatedByDentists")]
    public virtual Dentist CreatedByDentist { get; set; } = null!;

    [ForeignKey("DentistId")]
    [InverseProperty("TreatmentDentists")]
    public virtual Dentist Dentist { get; set; } = null!;

    [InverseProperty("Treatment")]
    public virtual ICollection<DispensingMedicine> DispensingMedicines { get; set; } = new List<DispensingMedicine>();

    [ForeignKey("PatientId")]
    [InverseProperty("Treatments")]
    public virtual Patient Patient { get; set; } = null!;

    [InverseProperty("Treatment")]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    [InverseProperty("Treatment")]
    public virtual ICollection<TreatmentDocument> TreatmentDocuments { get; set; } = new List<TreatmentDocument>();

    [InverseProperty("Treatment")]
    public virtual ICollection<TreatmentLab> TreatmentLabs { get; set; } = new List<TreatmentLab>();

    [InverseProperty("Treatment")]
    public virtual ICollection<TreatmentNextVisit> TreatmentNextVisits { get; set; } = new List<TreatmentNextVisit>();

    [InverseProperty("Treatment")]
    public virtual ICollection<TreatmentOperation> TreatmentOperations { get; set; } = new List<TreatmentOperation>();

    [ForeignKey("UpdatedByDentistId")]
    [InverseProperty("TreatmentUpdatedByDentists")]
    public virtual Dentist UpdatedByDentist { get; set; } = null!;
}