using ControlMando.Core.Entities;
using ControlMando.Core.Interfaces;
using ControlMando.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace ControlMando.Infrastructure.Repositories
{
    public class PersonaRepository: IPersonaRepository
    {
        private readonly ControlMandoContext _context;
        public PersonaRepository(ControlMandoContext context)
        {
            _context = context;
        }

        //Todos los metodos que se declararon en la interface deben ir declarados aca

        public async Task <IEnumerable<Persona>> GetPersonas()
        {
            var personas = await _context.Personas.ToListAsync();
            return personas;

        }

        //Obtener por id

        public async Task<Persona> GetPersona(int id) {

            var persona = await _context.Personas.FirstOrDefaultAsync(x => x.IdPersona == id);
            return persona;
        } 

        //El Filtro Todos

        public async Task<IEnumerable<Persona>> GetPersonasTDS(string nombreTD)
        {
            var personasTD = await _context.Personas.Where(x => x.Nombre.Contains(nombreTD) || x.Edad == nombreTD
            || x.ApellidoPaterno.Contains(nombreTD) || x.ApellidoMaterno.Contains(nombreTD)).ToListAsync();

            return personasTD;
        }


        //El Filtro Nombre

        public async Task<IEnumerable<Persona>> GetPersonasN(string nombre)
        {
            var personasN = await _context.Personas.Where(x => x.Nombre.Contains(nombre)).ToListAsync();
            return personasN;
        }


        //El filtro ApellidoPaterno

        public async Task<IEnumerable<Persona>> GetPersonasAP(string apellidoP)
        {
            var personasAP = await _context.Personas.Where(x => x.ApellidoPaterno.Contains(apellidoP)).ToListAsync();

            return personasAP;
        }

        //El filtro ApellidoMaterno

        public async Task<IEnumerable<Persona>> GetPersonasAM(string apellidoM)
        {
            var personasAM = await _context.Personas.Where(x => x.ApellidoMaterno.Contains(apellidoM)).ToListAsync();

            return personasAM;
        }

        //El filtro Edad

        public async Task<IEnumerable<Persona>> GetPersonasED(string edad)
        {
            var personasED = await _context.Personas.Where(x => x.Edad == edad).ToListAsync();

            return personasED;

        }

        //Filtro Activos
        public async Task<IEnumerable<Persona>> GetPersonasActivos(bool activo)
        {
            var personasTD = await _context.Personas.Where(x => x.Activo == activo).ToListAsync();
            return personasTD;
        }

        //Agregar un nuevo registro

        public async Task InsertarPersona(Persona persona)
        {

            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();
        
        }

        //Actualizar registros

        public async Task<bool> UpdatePersona(Persona persona)
        {
            var currentPersona = await GetPersona(persona.IdPersona);

            currentPersona.Nombre = persona.Nombre;
            currentPersona.ApellidoPaterno = persona.ApellidoPaterno;
            currentPersona.ApellidoMaterno = persona.ApellidoMaterno;
            currentPersona.Edad = persona.Edad;
            currentPersona.Activo = persona.Activo;

            int rows =  await _context.SaveChangesAsync();
            return rows > 0;

        }

        //Eliminar Registros

        public async Task<bool> DeletePersona(int id)
        {
            var currentPersona = await GetPersona(id);
            _context.Personas.Remove(currentPersona);

            int rows= await _context.SaveChangesAsync();
            return rows > 0;
        }



    }
}
