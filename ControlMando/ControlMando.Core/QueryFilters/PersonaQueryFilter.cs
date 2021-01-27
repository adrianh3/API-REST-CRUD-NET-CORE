using System;
using System.Collections.Generic;
using System.Text;

namespace ControlMando.Core.QueryFilters
{
    public class PersonaQueryFilter
    {
        public string Nombre { get; set; }
        public string ApellidoP { get; set; }
        public string ApellidoM { get; set; }
        public string Edad { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }

    }
}
