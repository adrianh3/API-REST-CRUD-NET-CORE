using ControlMando.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControlMando.Infrastructure.Data.Configurations
{
    public class PersonaConfiguration : IEntityTypeConfiguration<Persona>
    {
        public void Configure(EntityTypeBuilder<Persona> builder)
        {
            builder.ToTable("Persona");

            builder.HasKey(e => e.IdPersona)
                    .HasName("PK_Personas");


            builder.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50);


            builder.Property(e => e.ApellidoPaterno)
                    .IsRequired()
                    .HasMaxLength(50);

            builder.Property(e => e.ApellidoMaterno)
                    .IsRequired()
                    .HasMaxLength(50);


            builder.Property(e => e.Edad)
                    .HasMaxLength(50)
                    .IsRequired();

            builder.Property(e => e.Activo)
                    .IsRequired();
        }
    }
}
