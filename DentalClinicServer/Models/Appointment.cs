﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Appointment")]
public partial class Appointment
{
    [Key]
    [Column(TypeName = "character varying")]
    public string AppointmentId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string PatientId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string DentistId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string BranchId { get; set; } = null!;

    public int AppointmentStatusId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly AppointmentStartTime { get; set; }

    public TimeOnly AppointmentEndTime { get; set; }

    [Column(TypeName = "character varying")]
    public string? Subject { get; set; }

    public string? Remark { get; set; }

    public bool IsConfirmed { get; set; }

    public bool IsCancelled { get; set; }

    public DateOnly? CancelledDate { get; set; }

    public string? CancelledRemark { get; set; }

    public bool IsCompleted { get; set; }

    public DateOnly? CompletedDate { get; set; }

    public string? CompletedRemark { get; set; }

    public bool IsNotified { get; set; }

    public DateOnly? NotifyDate { get; set; }

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

    [ForeignKey("AppointmentStatusId")]
    [InverseProperty("Appointments")]
    public virtual AppointmentStatus AppointmentStatus { get; set; } = null!;

    [ForeignKey("BranchId")]
    [InverseProperty("Appointments")]
    public virtual Branch Branch { get; set; } = null!;

    [ForeignKey("CreatedByEmployeeId")]
    [InverseProperty("AppointmentCreatedByEmployees")]
    public virtual Employee CreatedByEmployee { get; set; } = null!;

    [ForeignKey("DentistId")]
    [InverseProperty("Appointments")]
    public virtual Dentist Dentist { get; set; } = null!;

    [ForeignKey("PatientId")]
    [InverseProperty("Appointments")]
    public virtual Patient Patient { get; set; } = null!;

    [ForeignKey("UpdatedByEmployeeId")]
    [InverseProperty("AppointmentUpdatedByEmployees")]
    public virtual Employee UpdatedByEmployee { get; set; } = null!;
}