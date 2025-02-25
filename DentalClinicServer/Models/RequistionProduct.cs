﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("RequistionProduct")]
public partial class RequistionProduct
{
    [Key]
    [Column(TypeName = "character varying")]
    public string RequistionProductId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string BranchId { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string ClinicStockId { get; set; } = null!;

    public int Quantity { get; set; }

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

    [ForeignKey("BranchId")]
    [InverseProperty("RequistionProducts")]
    public virtual Branch Branch { get; set; } = null!;

    [ForeignKey("ClinicStockId")]
    [InverseProperty("RequistionProducts")]
    public virtual ClinicStock ClinicStock { get; set; } = null!;

    [ForeignKey("CreatedByEmployeeId")]
    [InverseProperty("RequistionProductCreatedByEmployees")]
    public virtual Employee CreatedByEmployee { get; set; } = null!;

    [ForeignKey("UpdatedByEmployeeId")]
    [InverseProperty("RequistionProductUpdatedByEmployees")]
    public virtual Employee UpdatedByEmployee { get; set; } = null!;
}