﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Dentist")]
public partial class Dentist
{
    [Key]
    [Column(TypeName = "character varying")]
    public string DentistId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string DentistDisplayId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string Password { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string DentistLicense { get; set; } = null!;

    [Precision(10, 2)]
    public decimal DentistFeeRate { get; set; }

    [Precision(10, 2)]
    public decimal DefaultLabRate { get; set; }

    public int ExpertTypeId { get; set; }

    [Column(TypeName = "character varying")]
    public string BranchId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string Nationality { get; set; } = null!;

    [StringLength(13)]
    public string CitizenId { get; set; } = null!;

    public int GenderId { get; set; }

    [Column(TypeName = "character varying")]
    public string Prefix { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string FirstName { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string LastName { get; set; } = null!;

    [StringLength(10)]
    public string Telephone { get; set; } = null!;

    public string AddressLine1 { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public int ProvinceId { get; set; }

    public int DistrictId { get; set; }

    public int SubDistrictId { get; set; }

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
    public string CreatedByEmployeeId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string UpdatedByEmployeeId { get; set; } = null!;

    public bool IsActive { get; set; }

    [InverseProperty("Dentist")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [InverseProperty("CreatedByUserNavigation")]
    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    [ForeignKey("BranchId")]
    [InverseProperty("Dentists")]
    public virtual Branch Branch { get; set; } = null!;

    [ForeignKey("CreatedByEmployeeId")]
    [InverseProperty("DentistCreatedByEmployees")]
    public virtual Employee CreatedByEmployee { get; set; } = null!;

    [InverseProperty("Dentist")]
    public virtual ICollection<DentistWorkDay> DentistWorkDays { get; set; } = new List<DentistWorkDay>();

    [ForeignKey("ExpertTypeId")]
    [InverseProperty("Dentists")]
    public virtual ExpertType ExpertType { get; set; } = null!;

    [ForeignKey("GenderId")]
    [InverseProperty("Dentists")]
    public virtual Gender Gender { get; set; } = null!;

    [InverseProperty("CreatedByDentist")]
    public virtual ICollection<Treatment> TreatmentCreatedByDentists { get; set; } = new List<Treatment>();

    [InverseProperty("Dentist")]
    public virtual ICollection<Treatment> TreatmentDentists { get; set; } = new List<Treatment>();

    [InverseProperty("CreatedByUserNavigation")]
    public virtual ICollection<TreatmentDocument> TreatmentDocumentCreatedByUserNavigations { get; set; } = new List<TreatmentDocument>();

    [InverseProperty("UpdatedByUserNavigation")]
    public virtual ICollection<TreatmentDocument> TreatmentDocumentUpdatedByUserNavigations { get; set; } = new List<TreatmentDocument>();

    [InverseProperty("CreatedByDentist")]
    public virtual ICollection<TreatmentLab> TreatmentLabCreatedByDentists { get; set; } = new List<TreatmentLab>();

    [InverseProperty("UpdatedByDentist")]
    public virtual ICollection<TreatmentLab> TreatmentLabUpdatedByDentists { get; set; } = new List<TreatmentLab>();

    [InverseProperty("CreatedByDentist")]
    public virtual ICollection<TreatmentNextVisit> TreatmentNextVisitCreatedByDentists { get; set; } = new List<TreatmentNextVisit>();

    [InverseProperty("UpdatedByDentist")]
    public virtual ICollection<TreatmentNextVisit> TreatmentNextVisitUpdatedByDentists { get; set; } = new List<TreatmentNextVisit>();

    [InverseProperty("CreatedByDentist")]
    public virtual ICollection<TreatmentOperation> TreatmentOperationCreatedByDentists { get; set; } = new List<TreatmentOperation>();

    [InverseProperty("UpdatedByDentist")]
    public virtual ICollection<TreatmentOperation> TreatmentOperationUpdatedByDentists { get; set; } = new List<TreatmentOperation>();

    [InverseProperty("CreatedByDentist")]
    public virtual ICollection<TreatmentRecordEditHistory> TreatmentRecordEditHistoryCreatedByDentists { get; set; } = new List<TreatmentRecordEditHistory>();

    [InverseProperty("UpdatedByDentist")]
    public virtual ICollection<TreatmentRecordEditHistory> TreatmentRecordEditHistoryUpdatedByDentists { get; set; } = new List<TreatmentRecordEditHistory>();

    [InverseProperty("CreatedByDentist")]
    public virtual ICollection<TreatmentRecordTemplat> TreatmentRecordTemplatCreatedByDentists { get; set; } = new List<TreatmentRecordTemplat>();

    [InverseProperty("UpdatedByDentist")]
    public virtual ICollection<TreatmentRecordTemplat> TreatmentRecordTemplatUpdatedByDentists { get; set; } = new List<TreatmentRecordTemplat>();

    [InverseProperty("UpdatedByDentist")]
    public virtual ICollection<Treatment> TreatmentUpdatedByDentists { get; set; } = new List<Treatment>();

    [ForeignKey("UpdatedByEmployeeId")]
    [InverseProperty("DentistUpdatedByEmployees")]
    public virtual Employee UpdatedByEmployee { get; set; } = null!;
}