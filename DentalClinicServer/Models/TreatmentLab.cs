﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("TreatmentLab")]
public partial class TreatmentLab
{
    [Key]
    [Column(TypeName = "character varying")]
    public string TreatmentLabId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string TreatmentId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string LabVenderId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Remark { get; set; }

    [Precision(10, 2)]
    public decimal? Cost { get; set; }

    [Precision(10, 2)]
    public decimal? OverriddenLabRate { get; set; }

    public bool IsReceived { get; set; }

    public DateOnly? ReceivedDate { get; set; }

    /// <summary>
    /// Create date
    /// </summary>
    [Column(TypeName = "timestamp with time zone")]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Update date
    /// </summary>
    [Column(TypeName = "timestamp with time zone")]
    public DateTime UpdatedAt { get; set; }

    [Column(TypeName = "character varying")]
    public string CreatedByDentistId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string UpdatedByDentistId { get; set; } = null!;

    public bool IsActive { get; set; }

    [ForeignKey("CreatedByDentistId")]
    [InverseProperty("TreatmentLabCreatedByDentists")]
    public virtual Dentist CreatedByDentist { get; set; } = null!;

    [ForeignKey("LabVenderId")]
    [InverseProperty("TreatmentLabs")]
    public virtual LabVender LabVender { get; set; } = null!;

    [ForeignKey("TreatmentId")]
    [InverseProperty("TreatmentLabs")]
    public virtual Treatment Treatment { get; set; } = null!;

    [ForeignKey("UpdatedByDentistId")]
    [InverseProperty("TreatmentLabUpdatedByDentists")]
    public virtual Dentist UpdatedByDentist { get; set; } = null!;
}
