using ControlMando.Core.CustomEntities;
using ControlMando.Core.Entities;
using ControlMando.Core.Exceptions;
using ControlMando.Core.Interfaces;
using ControlMando.Core.QueryFilters;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace ControlMando.Core.Services
{
    public class PersonaService : IPersonaService
    {
        private readonly IPersonaRepository _personaRepository;
        private readonly PaginationOptions _paginationOptions;


        public PersonaService(IPersonaRepository personaRepository,IOptions<PaginationOptions> options)
        {
            _personaRepository = personaRepository;
            _paginationOptions = options.Value;

        }

        //Persona Por ID

        public async Task<Persona> GetPersona(int id)
        {
            return await _personaRepository.GetPersona(id);
        }

        //Obtener Todos los registros de las  personas

        public async Task<PagedList<Persona>> GetPersonas(PersonaQueryFilter filters)
        {

            filters.PageNumber = filters.PageNumber == 0 ? _paginationOptions.DefaultPageNumber : filters.PageNumber;
            filters.PageSize = filters.PageSize == 0 ? _paginationOptions.DefaultPageSize : filters.PageSize;

            var personas = await _personaRepository.GetPersonas();

            if (filters.Nombre != null)
            {
                personas = personas.Where(x=> x.Nombre.ToLower().Contains(filters.Nombre.ToLower()));
            }
            
            if (filters.ApellidoP != null)
            {
                personas = personas.Where(x => x.ApellidoPaterno.ToLower().Contains(filters.ApellidoP.ToLower()));
            }

            if (filters.ApellidoM != null)
            {
                personas = personas.Where(x => x.ApellidoMaterno.ToLower().Contains(filters.ApellidoM.ToLower()));
            }

            if (filters.Edad != null)
            {
                personas = personas.Where(x => x.Edad.ToLower().Contains(filters.Edad.ToLower()));
            }
            
            
            var pagedPosts = PagedList<Persona>.Create(personas,filters.PageNumber, filters.PageSize);


            return pagedPosts;
        }

        //Filtros

        public async Task<PagedList<Persona>> GetPersonasTDS(string nombreTD, PersonaQueryFilter filters)
        {
            var personass = await _personaRepository.GetPersonasTDS(nombreTD);

            filters.PageNumber = filters.PageNumber == 0 ? _paginationOptions.DefaultPageNumber : filters.PageNumber;
            filters.PageSize = filters.PageSize == 0 ? _paginationOptions.DefaultPageSize : filters.PageSize;

            personass = personass.Where(x => x.Nombre.Contains(nombreTD) || x.Edad == nombreTD
            || x.ApellidoPaterno.Contains(nombreTD) || x.ApellidoMaterno.Contains(nombreTD));

            var pagedPosts = PagedList<Persona>.Create(personass, filters.PageNumber, filters.PageSize);


            return pagedPosts;

        }

        //--Activos

        public async Task<PagedList<Persona>> GetPersonasActivos(bool activo, PersonaQueryFilter filters)
        {
            var personasss = await _personaRepository.GetPersonasActivos(activo);
            filters.PageNumber = filters.PageNumber == 0 ? _paginationOptions.DefaultPageNumber : filters.PageNumber;
            filters.PageSize = filters.PageSize == 0 ? _paginationOptions.DefaultPageSize : filters.PageSize;

            personasss = personasss.Where(x => x.Activo == activo);

            var pagedPostts = PagedList<Persona>.Create(personasss, filters.PageNumber, filters.PageSize);

            return pagedPostts;
        }

        public async Task<IEnumerable<Persona>> GetPersonasN(string nombre)
        {
            return await _personaRepository.GetPersonasN(nombre);
        }

        public async Task<IEnumerable<Persona>> GetPersonasAP(string apellidoP)
        {
            return await _personaRepository.GetPersonasAP(apellidoP);
        }


        public async Task<IEnumerable<Persona>> GetPersonasAM(string apellidoM)
        {
            return await _personaRepository.GetPersonasAM(apellidoM);
        }

        public async Task<IEnumerable<Persona>> GetPersonasED(string edad)
        {
            return await _personaRepository.GetPersonasED(edad);
        }

        //Insertar

        public async Task InsertarPersona(Persona persona)
        {

            int i = 0;

            if (int.TryParse(persona.Edad, out i))
            {
                await _personaRepository.InsertarPersona(persona);
            }
            else {

                throw new BusinessException("Se esperaba un numero en la edad // revisar //");
            }
        
        }

        //Actualizar

        public async Task<bool> UpdatePersona(Persona persona)
        {


            int i = 0;

            if (int.TryParse(persona.Edad, out i))
            {
                return await _personaRepository.UpdatePersona(persona);
            }
            else
            {

                throw new BusinessException("Se esperaba un numero en la edad // revisar //");
            }

            
        }

        //Eliminar

        public async Task<bool> DeletePersona(int id)
        {
            return await _personaRepository.DeletePersona(id);
        }

        public Task GetPersonasTDS(PersonaQueryFilter filters)
        {
            throw new NotImplementedException();
        }
    }
}
