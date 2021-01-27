using ControlMando.Core.QueryFilters;
using ControlMando.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControlMando.Infrastructure.Services
{
   public class UriService: IUriService
    {
        private readonly string _baseUri;

        public UriService(string baseUri)
        {
           _baseUri = baseUri;
        }

        public Uri GetPersonaPaginationUri(PersonaQueryFilter filters, string actionUrl) 
        {
            string baseUrl = $"{_baseUri}{actionUrl}";

            return new Uri(baseUrl);
        }

    }
}
