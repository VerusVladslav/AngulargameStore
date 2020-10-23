using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DataAccess.Entity;
using BaseJWTApplication819.DTO.Models;
using BaseJWTApplication819.DTO.Models.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BaseJWTApplication819.Api_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeveloperController : ControllerBase
    {
        private readonly EFContext _context;

        public DeveloperController(EFContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<DeveloperDTO> GetAllDevelopers()
        {
            var data = _context.Developers.Select(t => new DeveloperDTO
            {
                Id = t.Id,
                Name = t.Name
            }).ToList();

            return data;
        }

       // [Authorize(Roles = "Admin")]
        [HttpPost("addDeveloper")]
        public async Task<ResultDTO> AddNewDeveloper([FromBody] DeveloperAddDTO developer)
        {

            Developer newDeveloper = new Developer();
            newDeveloper.Name = developer.name;
           // newDeveloper.Id = _context.Developers.LastOrDefault().Id+1;


            await _context.Developers.AddAsync(newDeveloper);
            await _context.SaveChangesAsync();

            return  new ResultDTO
            {
                Status = 200,
                Message = "Item added"
            };
        }
      //  [Authorize(Roles = "Admin")]
        [HttpPost("removeDeveloper/{id}")]
        public async Task<ResultDTO> DeleteDeveloper([FromRoute] int id)
        {


            if (_context.Developers.FirstOrDefault(x => x.Id == id) != null)
            {
                var developer = _context.Developers.FirstOrDefault(x => x.Id == id);
                _context.Games.RemoveRange(_context.Games.Where(x => x.Developer.Id == developer.Id));
                _context.Developers.Remove(_context.Developers.FirstOrDefault(x => x.Id == id));
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
    }
}
