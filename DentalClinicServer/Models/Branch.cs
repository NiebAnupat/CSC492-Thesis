﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Branch")]
public partial class Branch
{
    [Key]
    [Column(TypeName = "character varying")]
    public string BranchId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string? BranchDisplayId { get; set; }

    [Column(TypeName = "character varying")]
    public string NameInThai { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string NameInEnglish { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string ClinicId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string? LogoFileName { get; set; }

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
    public string? UpdatedByCustomerId { get; set; }

    public bool IsActive { get; set; }

    [InverseProperty("Branch")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [InverseProperty("Branch")]
    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    [ForeignKey("ClinicId")]
    [InverseProperty("Branches")]
    public virtual Clinic Clinic { get; set; } = null!;

    [InverseProperty("Branch")]
    public virtual ICollection<ClinicStock> ClinicStocks { get; set; } = new List<ClinicStock>();

    [InverseProperty("Branch")]
    public virtual ICollection<DentistWorkDay> DentistWorkDays { get; set; } = new List<DentistWorkDay>();

    [InverseProperty("Branch")]
    public virtual ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();

    [InverseProperty("Branch")]
    public virtual ICollection<DispensingMedicine> DispensingMedicines { get; set; } = new List<DispensingMedicine>();

    [InverseProperty("Branch")]
    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    [InverseProperty("Branch")]
    public virtual ICollection<LabVender> LabVenders { get; set; } = new List<LabVender>();

    [InverseProperty("Branch")]
    public virtual ICollection<Medicine> Medicines { get; set; } = new List<Medicine>();

    [InverseProperty("Branch")]
    public virtual ICollection<OperationType> OperationTypes { get; set; } = new List<OperationType>();

    [InverseProperty("Branch")]
    public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();

    [InverseProperty("Branch")]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    [InverseProperty("Branch")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [InverseProperty("Branch")]
    public virtual ICollection<RequistionProduct> RequistionProducts { get; set; } = new List<RequistionProduct>();

    [InverseProperty("Branch")]
    public virtual ICollection<TagList> TagLists { get; set; } = new List<TagList>();

    [InverseProperty("Branch")]
    public virtual ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();

    [ForeignKey("UpdatedByCustomerId")]
    [InverseProperty("Branches")]
    public virtual Customer? UpdatedByCustomer { get; set; }
}