using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DTO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BaseJWTApplication819.Api_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly EFContext _context;

        public GenreController(EFContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<GenreDTO> GetAllGenres()
        {
            var data = _context.Genres.Select(t => new GenreDTO
            {
                Id = t.Id,
               Name=t.Name
            }).ToList();

            return data;
        }
    }
}
