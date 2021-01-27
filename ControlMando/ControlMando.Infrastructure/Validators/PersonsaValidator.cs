using ControlMando.Core.DTOs;
using ControlMando.Core.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.VisualBasic;

namespace ControlMando.Infrastructure.Validators
{
    public class PersonsaValidator : AbstractValidator<PersonaDto>
    {

        public PersonsaValidator()
        {

            RuleFor(persona => persona.Nombre)
            .NotNull()
            .Length(2, 50);

            RuleFor(persona => persona.ApellidoPaterno)
            .NotNull()
            .Length(2, 50);

            RuleFor(persona => persona.ApellidoMaterno)
            .NotNull()
            .Length(2, 50);

            RuleFor(persona => persona.Edad)
            .NotNull();
            
            RuleFor(persona => persona.Activo)
            .NotNull();



        }


    }

}
