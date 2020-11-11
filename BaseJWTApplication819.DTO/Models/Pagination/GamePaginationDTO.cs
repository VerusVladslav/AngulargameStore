using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BaseJWTApplication819.DTO.Models.Pagination
{
   public class GamePaginationDTO
    {
        public GamePaginationDTO(
           int totalItems = 10,
           int currentPage = 1,
           int pageSize = 3,
           int maxPages = 10)
        {
            
            var totalPages = (int)Math.Ceiling((decimal)totalItems / (decimal)pageSize);

           
            if (currentPage < 1)
            {
                currentPage = 1;
            }
            else if (currentPage > totalPages)
            {
                currentPage = totalPages;
            }

            int startPage, endPage;
            if (totalPages <= maxPages)
            {
               
                startPage = 1;
                endPage = totalPages;
            }
            else
            {
                
                var maxPagesBeforeCurrentPage = (int)Math.Floor((decimal)maxPages / (decimal)2);
                var maxPagesAfterCurrentPage = (int)Math.Ceiling((decimal)maxPages / (decimal)2) - 1;
                if (currentPage <= maxPagesBeforeCurrentPage)
                {
                    
                    startPage = 1;
                    endPage = maxPages;
                }
                else if (currentPage + maxPagesAfterCurrentPage >= totalPages)
                {
                   
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                }
                else
                {
                    
                    startPage = currentPage - maxPagesBeforeCurrentPage;
                    endPage = currentPage + maxPagesAfterCurrentPage;
                }
            }

           
            var startIndex = (currentPage - 1) * pageSize;
           
            var endIndex = Math.Min(startIndex + pageSize - 1, totalItems - 1);
            
            
            var pages = Enumerable.Range(startPage, (endPage + 1) - startPage);
            
           
            TotalItems = totalItems;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalPages = totalPages;
            StartPage = startPage;
            EndPage = endPage;
            StartIndex = startIndex;
            EndIndex = endIndex;
            Pages = pages;
        }
        
        public int TotalItems { get; set; }
        public int CurrentPage { get;  set; }
        public int PageSize { get;  set; }
        public int TotalPages { get;  set; }
        public int StartPage { get;  set; }
        public int EndPage { get;  set; }
        public int StartIndex { get;  set; }
        public int EndIndex { get;  set; }
        public IEnumerable<int> Pages { get;  set; }
    }
}

