using AutoMapper;
using ControlMando.Api.Response;
using ControlMando.Core.CustomEntities;
using ControlMando.Core.DTOs;
using ControlMando.Core.Entities;
using ControlMando.Core.Interfaces;
using ControlMando.Core.QueryFilters;
using ControlMando.Infrastructure.Interfaces;
using ControlMando.Infrastructure.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlMando.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        //Inyectar dependencias

        private readonly IPersonaService _personaService;
        private readonly IMapper _mapper;

        private readonly IUriService _uriService;

        public PersonaController(IPersonaService personaService, IMapper mapper, IUriService uriService)
        {
            _personaService = personaService;
            _mapper = mapper;
            _uriService = uriService;

        }

        //Devuelve un listado de las personas haciendo el llamado dede  la interfaz

        //Buscar persona por id

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersona(int id)
        {

            var persona = await _personaService.GetPersona(id);
            var personaDto = _mapper.Map<PersonaDto>(persona);
            var response = new ApiResponse<PersonaDto>(personaDto);
            return Ok(response);

        }


        //Muestra todos los registros 

        [HttpGet(Name = nameof(GetPersonas))]
        public async Task<IActionResult> GetPersonas([FromQuery] PersonaQueryFilter filters)
        {


            var personas = await _personaService.GetPersonas(filters);
            var personasDtos = _mapper.Map<IEnumerable<PersonaDto>>(personas);


            var metadata = new Metadata
            {
                TotalCount = personas.TotalCount,
                PageSize = personas.PageSize,
                ActualPage = personas.ActualPage,
                TotalPages = personas.TotalPages,
                HasNextPage = personas.HasNextPage,
                HasPreviousPage = personas.HasPreviousPage,
                NextPageUrl = _uriService.GetPersonaPaginationUri(filters,Url.RouteUrl(nameof(GetPersonas))).ToString(),
                PreviousPageUrl = _uriService.GetPersonaPaginationUri(filters, Url.RouteUrl(nameof(GetPersonas))).ToString()
            };

            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasDtos) { Meta = metadata };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            return Ok(response);

        }

        //filtros

        //Buscar en todos los filtros Disable     
        [HttpGet("Todo/" + "{nombreTD}")]
        public async Task<IActionResult> GetPersonasTDS(string nombreTD, [FromQuery] PersonaQueryFilter filters)
        {
            var personasTDS = await _personaService.GetPersonasTDS(nombreTD, filters);
            var personasTDSDto = _mapper.Map<IEnumerable<PersonaDto>>(personasTDS);
            

            var metadata = new Metadata
            {

                TotalCount = personasTDS.TotalCount,
                PageSize = personasTDS.PageSize,
                ActualPage = personasTDS.ActualPage,
                TotalPages = personasTDS.TotalPages,
                HasNextPage = personasTDS.HasNextPage,
                HasPreviousPage = personasTDS.HasPreviousPage

            };

            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasTDSDto) { Meta = metadata };

            Response.Headers.Add("X-Paginations", JsonConvert.SerializeObject(metadata));

            return Ok(response);
        }
        //Filtro Activos

        [HttpGet("Activo/" + "{activo}")]
        public async Task<IActionResult> GetPersonasActivos(bool activo, [FromQuery] PersonaQueryFilter filters)
        {
            var personasN = await _personaService.GetPersonasActivos(activo,filters);
            var personasNDto = _mapper.Map<IEnumerable<PersonaDto>>(personasN);

            var metadata = new Metadata
            {

                TotalCount = personasN.TotalCount,
                PageSize = personasN.PageSize,
                ActualPage = personasN.ActualPage,
                TotalPages = personasN.TotalPages,
                HasNextPage = personasN.HasNextPage,
                HasPreviousPage = personasN.HasPreviousPage

            };

            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasNDto) { Meta = metadata };
            Response.Headers.Add("X-Paginations", JsonConvert.SerializeObject(metadata));

            return Ok(response);
        }

        //Filtros especificos

        [HttpGet("Nombre/" + "{nombre}")]
        public async Task<IActionResult> GetPersonasN(string nombre)
        {
            var personasN = await _personaService.GetPersonasN(nombre);
            var personasNDto = _mapper.Map<IEnumerable<PersonaDto>>(personasN);
            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasNDto);
            return Ok(response);
        }


        [HttpGet("apellidoP/" + "{apellidoP}")]
        public async Task<IActionResult> GetPersonasAP(string apellidoP)
        {
            var personasAP = await _personaService.GetPersonasAP(apellidoP);
            var personasAPDto = _mapper.Map<IEnumerable<PersonaDto>>(personasAP);

            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasAPDto);

            return Ok(response);
        }


        [HttpGet("apellidoM/" + "{apellidoM}")]
        public async Task<IActionResult> GetPersonasAM(string apellidoM)
        {
            var personasAM = await _personaService.GetPersonasAM(apellidoM);
            var personasAMDto = _mapper.Map<IEnumerable<PersonaDto>>(personasAM);

            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasAMDto);

            return Ok(response);
        }


        [HttpGet("Edad/" + "{edad}")]
        public async Task<IActionResult> GetPersonasED(string edad)
        {
            var personasED = await _personaService.GetPersonasED(edad);
            var personasEDDto = _mapper.Map<IEnumerable<PersonaDto>>(personasED);

            var response = new ApiResponse<IEnumerable<PersonaDto>>(personasEDDto);

            return Ok(response);
        }

        //Agregar nuevo usuario

        [HttpPost]
        public async Task<IActionResult> Persona(PersonaDto personaDto)
        {
            var persona = _mapper.Map<Persona>(personaDto);

            await _personaService.InsertarPersona(persona);

            personaDto = _mapper.Map<PersonaDto>(persona);

            var response = new ApiResponse<PersonaDto>(personaDto);

            return Ok(response);
        }



        //Actualizar Usuarios

        [HttpPut]
        public async Task<IActionResult> Actualizar(int id, PersonaDto personaDto)
        {
            var persona = _mapper.Map<Persona>(personaDto);
            persona.IdPersona = id;

            var resultado = await _personaService.UpdatePersona(persona);
            var response = new ApiResponse<bool>(resultado);

            return Ok(response);
        }

        //Eliminar Usuario

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var resultado = await _personaService.DeletePersona(id);

            var response = new ApiResponse<bool>(resultado);

            return Ok(response);
        }
    }
}
