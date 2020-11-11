using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DataAccess.Entity;
using BaseJWTApplication819.DTO.Models;
using BaseJWTApplication819.DTO.Models.AddDTO;
using BaseJWTApplication819.DTO.Models.Results;
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
        //  [Authorize(Roles = "Admin")]
        [HttpPost("addGenre")]
        public async Task<ResultDTO> AddNewGenre([FromBody] GenreAddDTO genre)
        {

            Genre newGenre = new Genre();
            newGenre.Name = genre.name;
            // newDeveloper.Id = _context.Developers.LastOrDefault().Id+1;


            await _context.Genres.AddAsync(newGenre);
            await _context.SaveChangesAsync();

            return new ResultDTO
            {
                Status = 200,
                Message = "Item added"
            };
        }
        //  [Authorize(Roles = "Admin")]
        [HttpPost("removeGenre/{id}")]
        public async Task<ResultDTO> DeleteGenre([FromRoute] int id)
        {


            if (_context.Genres.FirstOrDefault(x => x.Id == id) != null)
            {
                var genre = _context.Genres.FirstOrDefault(x => x.Id == id);
                _context.Games.RemoveRange(_context.Games.Where(x => x.Genre.Id == genre.Id));
                _context.Genres.Remove(_context.Genres.FirstOrDefault(x => x.Id == id));
                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Item removed"
                };
            }
            else
            {
                return new ResultErrorDTO
                {
                    Status = 600,
                    Message = "Error",
                    Errors = new List<string>
                    {
                        "Error on Server"
                    }
                };
            }



        }
        [HttpPost("editGenre")]
        public async Task<ResultDTO> EditGenre ([FromBody] GenreDTO genre)
        {
            if (_context.Genres.FirstOrDefault(x => x.Id == genre.Id) != null)
            {
                 _context.Genres.FirstOrDefault(x => x.Id == genre.Id).Name=genre.Name;
               


                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Item changed"
                };
            }
            else
            {
                return new ResultErrorDTO
                {
                    Status = 600,
                    Message = "Error",
                    Errors = new List<string>
                    {
                        "Error on Server"
                    }
                };
            }



        }

        [HttpGet("editGenre/{id}")]
        public GenreDTO EditGetGenre([FromRoute] int id)
        {
            
               var genredb = _context.Genres.FirstOrDefault(x => x.Id == id);
                var genre = new GenreDTO();

                genre.Id = genredb.Id;
                genre.Name = genredb.Name;



                return genre;
              
            
            



        }
    }
}
