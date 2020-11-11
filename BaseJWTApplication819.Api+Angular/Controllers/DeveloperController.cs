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
        [Authorize]
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

        [Authorize(Roles = "Admin")]
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
       [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
        [HttpPost("editDeveloper")]
        public async Task<ResultDTO> EditDeveloper([FromBody] DeveloperDTO developer)
        {
            if (_context.Developers.FirstOrDefault(x => x.Id == developer.Id) != null)
            {
                _context.Developers.FirstOrDefault(x => x.Id == developer.Id).Name = developer.Name;



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
        [Authorize]
        [HttpGet("editDeveloper/{id}")]
        public DeveloperDTO EditGetDeveloper([FromRoute] int id)
        {

            var devdb = _context.Developers.FirstOrDefault(x => x.Id == id);
            var dev = new DeveloperDTO();

            dev.Id = devdb.Id;
            dev.Name = devdb.Name;



            return dev;

        }
    }
}
