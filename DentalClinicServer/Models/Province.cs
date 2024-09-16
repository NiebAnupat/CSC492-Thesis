﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicServer.Models;

[Table("Province")]
[Index("Code", Name = "Province_Code_key", IsUnique = true)]
public partial class Province
{
    [Key]
    public int ProvinceId { get; set; }

    public int Code { get; set; }

    [Column(TypeName = "character varying")]
    public string NameInThai { get; set; } = null!;

    [Column(TypeName = "character varying")]
    public string? NameInEnglish { get; set; }

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

    public bool IsActive { get; set; }

    [InverseProperty("Province")]
    public virtual ICollection<District> Districts { get; set; } = new List<District>();
}