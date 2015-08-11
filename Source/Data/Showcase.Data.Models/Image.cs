﻿namespace Showcase.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Images")]
    public class Image : FileInfo
    {
        public string UrlPath { get; set; }

        public int? ProjectId { get; set; }

        [InverseProperty("Images")]
        public virtual Project Project { get; set; }
    }
}