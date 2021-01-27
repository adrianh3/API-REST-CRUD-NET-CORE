using ControlMando.Core.QueryFilters;
using System;

namespace ControlMando.Infrastructure.Interfaces
{
    public interface IUriService
    {

        Uri GetPersonaPaginationUri(PersonaQueryFilter filters, string actionUrl);

    }
}