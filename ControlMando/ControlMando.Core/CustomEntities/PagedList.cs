using System;
using System.Collections.Generic;
using System.Linq;

namespace ControlMando.Core.CustomEntities
{
    public class PagedList<T>: List<T>
    {

        public int ActualPage { get; set; }

        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public bool HasPreviousPage => ActualPage > 1;

        public bool HasNextPage => ActualPage < TotalPages;

        public int? NextPageNumber => HasNextPage ? ActualPage + 1: (int?)null;

        public int? PreviousPageNumber => HasPreviousPage ? ActualPage - 1 : (int?)null;

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            ActualPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count/(double)pageSize);

            AddRange(items);
        }


        public static PagedList<T> Create(IEnumerable<T> source, int pageNumber, int pageSize) {
            
            var count = source.Count();
            var items = source.Skip((pageNumber - 1)*pageSize).Take(pageSize).ToList();

            return new PagedList<T>(items,count,pageNumber,pageSize);

        }


    }
}
