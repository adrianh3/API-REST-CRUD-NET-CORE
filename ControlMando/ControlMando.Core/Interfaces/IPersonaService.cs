using ControlMando.Core.CustomEntities;
using ControlMando.Core.Entities;
using ControlMando.Core.QueryFilters;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControlMando.Core.Interfaces
{
    public interface IPersonaService
    {

        //Buscar por id

        Task<Persona> GetPersona(int id);

        //Metodos mostrar datos
        Task<PagedList<Persona>> GetPersonas(PersonaQueryFilter filters);

        Task<PagedList<Persona>> GetPersonasTDS(string nombreTD, PersonaQueryFilter filters);

        Task<IEnumerable<Persona>> GetPersonasN(string nombre);

        Task<IEnumerable<Persona>> GetPersonasAM(string apellidoM);
        Task<IEnumerable<Persona>> GetPersonasAP(string apellidoP);

        Task<IEnumerable<Persona>> GetPersonasED(string edad);

        Task<PagedList<Persona>> GetPersonasActivos(bool activo, PersonaQueryFilter filters);

        //Metodos Añadir datos
        Task InsertarPersona(Persona persona);

        //Actualizar
        Task<bool> UpdatePersona(Persona persona);

        //Eliminar

        Task<bool> DeletePersona(int id);
        Task GetPersonasTDS(PersonaQueryFilter filters);
    }
}