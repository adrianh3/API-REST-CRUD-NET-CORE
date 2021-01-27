using AutoMapper;
using ControlMando.Core.DTOs;
using ControlMando.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControlMando.Infrastructure.Mappings
{
    public class AutomapperProfile:Profile
    {

        public AutomapperProfile()
        {
            CreateMap<Persona, PersonaDto>();
            CreateMap<PersonaDto, Persona>();
            
        }

    }
}
