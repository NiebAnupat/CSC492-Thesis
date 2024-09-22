﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Medicine")]
public partial class Medicine
{
    [Key]
    [Column(TypeName = "character varying")]
    public string MedicineId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string Name { get; set; } = null!;

    [Precision(10, 2)]
    public decimal Price { get; set; }

    public string Instruction { get; set; } = null!;

    public string Precaution { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string BranchId { get; set; } = null!;

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
    public string CreatedByEmployeeId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string UpdatedByEmployeeId { get; set; } = null!;

    public bool IsActive { get; set; }

    [ForeignKey("BranchId")]
    [InverseProperty("Medicines")]
    public virtual Branch Branch { get; set; } = null!;

    [InverseProperty("Item")]
    public virtual ICollection<ClinicStock> ClinicStocks { get; set; } = new List<ClinicStock>();

    [ForeignKey("CreatedByEmployeeId")]
    [InverseProperty("MedicineCreatedByEmployees")]
    public virtual Employee CreatedByEmployee { get; set; } = null!;

    [ForeignKey("UpdatedByEmployeeId")]
    [InverseProperty("MedicineUpdatedByEmployees")]
    public virtual Employee UpdatedByEmployee { get; set; } = null!;
}
