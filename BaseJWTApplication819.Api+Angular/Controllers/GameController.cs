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
    public class GameController : ControllerBase
    {
        private readonly EFContext _context;

        public GameController(EFContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<GameDTO> GetAllGames()
        {
            var data = _context.Games.Select(t => new GameDTO
            {
                Id = t.Id,
                Developer = t.Developer.Name,
                Genre = t.Genre.Name,
                Description=t.Description,
                ImageURL=t.ImageURL,
                Price=t.Price,
                Title=t.Title,
                Year=t.Year
            }).ToList();

            return data;
        }

        
    }
}
