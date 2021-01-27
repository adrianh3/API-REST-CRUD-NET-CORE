using System;
using ControlMando.Core.Entities;
using ControlMando.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace ControlMando.Infrastructure.Data
{
    public partial class ControlMandoContext : DbContext
    {
        public ControlMandoContext()
        {
        }

        public ControlMandoContext(DbContextOptions<ControlMandoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Persona> Personas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PersonaConfiguration());

        }
    }
}
