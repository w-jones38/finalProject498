using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Calvin.Models;

namespace Calvin.Data
{
    public partial class CalvinContext : DbContext
    {
        public CalvinContext()
        {
        }

        public CalvinContext(DbContextOptions<CalvinContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CalvinStrip> CalvinStrips { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<CalvinStrip>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ComicStrip)
                    .HasColumnType("mediumblob")
                    .HasColumnName("comicStrip");

                entity.Property(e => e.DateOfPrint).HasColumnName("dateOfPrint");

                entity.Property(e => e.DisplayedDate).HasColumnName("displayedDate");

                entity.Property(e => e.FileName)
                    .HasMaxLength(255)
                    .HasColumnName("fileName")
                    .IsFixedLength();

                entity.Property(e => e.SundayComic).HasColumnName("sundayComic");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
