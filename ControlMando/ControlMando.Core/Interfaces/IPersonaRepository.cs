using ControlMando.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ControlMando.Core.Interfaces
{

    //Definir los metodos que deben implementar las clases
    //Trae la info de los repositorys para que el controlador los vea 
    public interface IPersonaRepository
    {
        //Buscar por id

        Task<Persona> GetPersona(int id);

        //Metodos mostrar datos
        Task<IEnumerable<Persona>> GetPersonas();

        Task<IEnumerable<Persona>> GetPersonasTDS(string nombreTD);

        Task<IEnumerable<Persona>> GetPersonasN(string nombre);

        Task<IEnumerable<Persona>> GetPersonasAM(string apellidoM);
        Task<IEnumerable<Persona>> GetPersonasAP(string apellidoP);

        //Filtro activo

        Task<IEnumerable<Persona>> GetPersonasActivos(bool activo);

        Task<IEnumerable<Persona>> GetPersonasED(string edad);

        //Metodos Añadir datos
        Task InsertarPersona(Persona persona);

        //Actualizar
        Task<bool> UpdatePersona(Persona persona);

        //Eliminar

        Task<bool> DeletePersona(int id);


    }



}
