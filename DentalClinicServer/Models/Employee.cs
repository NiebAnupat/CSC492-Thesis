﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Employee")]
public partial class Employee
{
    [Key]
    [Column(TypeName = "character varying")]
    public string EmployeeId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string EmployeeDisplayId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string Password { get; set; } = null!;

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

    [Column(TypeName = "character varying")]
    public string ProvinceId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string DistrictId { get; set; } = null!;

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

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Appointment> AppointmentCreatedByEmployees { get; set; } = new List<Appointment>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Appointment> AppointmentUpdatedByEmployees { get; set; } = new List<Appointment>();

    [InverseProperty("CreatedByUser1")]
    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    [ForeignKey("BranchId")]
    [InverseProperty("Employees")]
    public virtual Branch Branch { get; set; } = null!;

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<ClinicStock> ClinicStockCreatedByEmployees { get; set; } = new List<ClinicStock>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<ClinicStock> ClinicStockUpdatedByEmployees { get; set; } = new List<ClinicStock>();

    [ForeignKey("CreatedByEmployeeId")]
    [InverseProperty("InverseCreatedByEmployee")]
    public virtual Employee CreatedByEmployee { get; set; } = null!;

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Dentist> DentistCreatedByEmployees { get; set; } = new List<Dentist>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Dentist> DentistUpdatedByEmployees { get; set; } = new List<Dentist>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<DentistWorkDay> DentistWorkDayCreatedByEmployees { get; set; } = new List<DentistWorkDay>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<DentistWorkDay> DentistWorkDayUpdatedByEmployees { get; set; } = new List<DentistWorkDay>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<DispensingMedicine> DispensingMedicineCreatedByEmployees { get; set; } = new List<DispensingMedicine>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<DispensingMedicine> DispensingMedicineUpdatedByEmployees { get; set; } = new List<DispensingMedicine>();

    [ForeignKey("GenderId")]
    [InverseProperty("Employees")]
    public virtual Gender Gender { get; set; } = null!;

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Employee> InverseCreatedByEmployee { get; set; } = new List<Employee>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Employee> InverseUpdatedByEmployee { get; set; } = new List<Employee>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<LabVender> LabVenderCreatedByEmployees { get; set; } = new List<LabVender>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<LabVender> LabVenderUpdatedByEmployees { get; set; } = new List<LabVender>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Medicine> MedicineCreatedByEmployees { get; set; } = new List<Medicine>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Medicine> MedicineUpdatedByEmployees { get; set; } = new List<Medicine>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<OperationType> OperationTypeCreatedByEmployees { get; set; } = new List<OperationType>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<OperationType> OperationTypeUpdatedByEmployees { get; set; } = new List<OperationType>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Patient> PatientCreatedByEmployees { get; set; } = new List<Patient>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<PatientTag> PatientTagCreatedByEmployees { get; set; } = new List<PatientTag>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<PatientTag> PatientTagUpdatedByEmployees { get; set; } = new List<PatientTag>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Patient> PatientUpdatedByEmployees { get; set; } = new List<Patient>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Payment> PaymentCreatedByEmployees { get; set; } = new List<Payment>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<PaymentDetail> PaymentDetailCreatedByEmployees { get; set; } = new List<PaymentDetail>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<PaymentDetail> PaymentDetailUpdatedByEmployees { get; set; } = new List<PaymentDetail>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Payment> PaymentUpdatedByEmployees { get; set; } = new List<Payment>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<Product> ProductCreatedByEmployees { get; set; } = new List<Product>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<Product> ProductUpdatedByEmployees { get; set; } = new List<Product>();

    [InverseProperty("CreatedByEmployee")]
    public virtual ICollection<RequistionProduct> RequistionProductCreatedByEmployees { get; set; } = new List<RequistionProduct>();

    [InverseProperty("UpdatedByEmployee")]
    public virtual ICollection<RequistionProduct> RequistionProductUpdatedByEmployees { get; set; } = new List<RequistionProduct>();

    [InverseProperty("CreatedByUser1")]
    public virtual ICollection<TreatmentDocument> TreatmentDocumentCreatedByUser1s { get; set; } = new List<TreatmentDocument>();

    [InverseProperty("UpdatedByUser1")]
    public virtual ICollection<TreatmentDocument> TreatmentDocumentUpdatedByUser1s { get; set; } = new List<TreatmentDocument>();

    [ForeignKey("UpdatedByEmployeeId")]
    [InverseProperty("InverseUpdatedByEmployee")]
    public virtual Employee UpdatedByEmployee { get; set; } = null!;
}