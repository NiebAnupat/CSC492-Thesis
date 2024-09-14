﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("PatientTag")]
public partial class PatientTag
{
    [Key]
    [Column(TypeName = "character varying")]
    public string PatientTagId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string PatientId { get; set; } = null!;

    public int TagId { get; set; }

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

    [ForeignKey("CreatedByEmployeeId")]
    [InverseProperty("PatientTagCreatedByEmployees")]
    public virtual Employee CreatedByEmployee { get; set; } = null!;

    [ForeignKey("PatientId")]
    [InverseProperty("PatientTags")]
    public virtual Patient Patient { get; set; } = null!;

    [ForeignKey("TagId")]
    [InverseProperty("PatientTags")]
    public virtual TagList Tag { get; set; } = null!;

    [ForeignKey("UpdatedByEmployeeId")]
    [InverseProperty("PatientTagUpdatedByEmployees")]
    public virtual Employee UpdatedByEmployee { get; set; } = null!;
}