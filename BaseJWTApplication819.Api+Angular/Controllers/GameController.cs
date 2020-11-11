using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BaseJWTApplication819.Api_Angular.Helper;
using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DataAccess.Entity;
using BaseJWTApplication819.DTO.Models;
using BaseJWTApplication819.DTO.Models.AddDTO;
using BaseJWTApplication819.DTO.Models.Pagination;
using BaseJWTApplication819.DTO.Models.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaseJWTApplication819.Api_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IWebHostEnvironment _appEnvironment;
        private  GamePaginationDTO _gamePagination;

        public GameController(EFContext context, IWebHostEnvironment _appEnvironmen)
        {
            _context = context;
            _appEnvironment = _appEnvironmen;
            _gamePagination = new GamePaginationDTO();

        }
        [Authorize]
        [HttpGet("CountPages")]
        public ResultDTO GetPages()
        {
            _gamePagination = new GamePaginationDTO(_context.Games.Count());

            
              return new ResultDTO
            {
                Status = _gamePagination.TotalPages
              }; 
        }
        [Authorize]
        [HttpGet("CountPages/{idUser}")]
        public ResultDTO GetPages([FromRoute] string idUser)
        {
            _gamePagination = new GamePaginationDTO(_context.OrderLists.Include(z => z.User).Where(x => x.User.Id == idUser).Count());
           
            return new ResultDTO
            {
                Status = _gamePagination.TotalPages
            };
        }
        [Authorize]
        [HttpGet("Games/{page}")]
        public List<GameDTO> GetAllPaginationGames([FromRoute] int page)
        {
            _gamePagination = new GamePaginationDTO(_context.Games.Count(),page);

       

            var data = GetAllGames();
            var pagindata = new List<GameDTO>();
            if(_gamePagination.StartIndex == _gamePagination.EndIndex)
            {
                pagindata.Add(data[_gamePagination.StartIndex]);

            }
            else
            {
                for (int i = _gamePagination.StartIndex; i <= _gamePagination.EndIndex; i++)
                {
                    pagindata.Add(data[i]);
                }

            }


            return pagindata;
        }


        [Authorize]
        [HttpGet("getOrders/{id}/{page}")]
        public List<GameDTO> GetAllPaginationGames([FromRoute] string id, [FromRoute] int page)
        {
            
            _gamePagination = new GamePaginationDTO(_context.OrderLists.Include(z => z.User).Where(x => x.User.Id == id).Count(),page);
          

          
           
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            var userInfo = _context.UserAdditionalInfos.Include(z => z.Games).ThenInclude(f => f.Developer)
                .Include(p => p.Games).ThenInclude(r => r.Genre)
                .FirstOrDefault(x => x.Id == user.Id);

            List<GameDTO> list = new List<GameDTO>();      
            foreach (var item in userInfo.Games)
            {
                list.Add(new GameDTO
                {
                    Id = item.Id,
                    Developer = item.Developer.Name,
                    Genre = item.Genre.Name,
                    Description = item.Description,
                    ImageURL = item.ImageURL,
                    Price = item.Price,
                    Title = item.Title,
                    Year = item.Year
                });

            }
            var pagindata = new List<GameDTO>();
            if (_gamePagination.StartIndex == _gamePagination.EndIndex)
            {
                pagindata.Add(list[_gamePagination.StartIndex]);

            }
            else
            {
                for (int i = _gamePagination.StartIndex; i <= _gamePagination.EndIndex; i++)
                {
                    pagindata.Add(list[i]);
                }

            }

            return pagindata;
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
        [Authorize(Roles = "Admin")]
        [HttpPost("addGame")]
        public async Task<ResultDTO> AddNewGame([FromBody] GameAddDTO game)
        {

            Game newGame = new Game();
            newGame.GameKey = Guid.NewGuid().ToString();
            newGame.Title = game.title;
            newGame.Price = game.price;
            newGame.Description = game.description;
            newGame.ImageURL = game.imageURL;
            newGame.Year = game.year;
            newGame.Developer = _context.Developers.FirstOrDefault(x => x.Name == game.developer);
            newGame.Genre = _context.Genres.FirstOrDefault(x => x.Name == game.genre);

            // newDeveloper.Id = _context.Developers.LastOrDefault().Id+1;


            await _context.Games.AddAsync(newGame);
            await _context.SaveChangesAsync();

            return new ResultDTO
            {
                Status = 200,
                Message = "Item added"
            };
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("removeGame/{id}")]
        public async Task<ResultDTO> DeleteGame([FromRoute] int id)
        {


            if (_context.Games.FirstOrDefault(x => x.Id == id) != null)
            {
                var game = _context.Games.FirstOrDefault(x => x.Id == id);
              //  _context.Games.RemoveRange(_context.Games.Where(x => x.Genre.Id == genre.Id));
                _context.Games.Remove(game);
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
        [HttpPost("Search/{search}")]
        public List<GameDTO> SearchGames([FromRoute] string search)
        {
            if (search == "")
            {
                return GetAllGames();
            }
            else
            {
                var games = GetAllGames();
                List<GameDTO> sorted = games.Where(x => x.Title.Contains(search)).ToList();
                return sorted;
            }
        }
                
               
        
        [HttpPost("UploadImage/{id}")]
        public ResultDTO Uploadfile ([FromRoute] string id,[FromForm(Name = "file")] IFormFile image)
        {
            string Filename = Guid.NewGuid().ToString() + ".jpg";
            string path = _appEnvironment.WebRootPath + @"\Images";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            path = path +@"\"+ Filename;
            if(image == null)
            {
                return new ResultErrorDTO
                {
                    Message = "File is null",
                    Status = 405,
                    Errors = null
                };
            }
            if(image.Length==0)
            {
                return new ResultErrorDTO
                {
                    Message = "File is empty",
                    Status = 405,
                    Errors = null
                };
            }
            using(Bitmap b=new Bitmap(image.OpenReadStream()))
            {
                Bitmap SaveImage = ImageWorker.CreateImage(b, 400, 300);

                if(SaveImage != null)
                {
                    SaveImage.Save(path, ImageFormat.Jpeg);
                    Game game =_context.Games.Find(id);
                    if(game.ImageURL!=null)
                    {
                        System.IO.File.Delete(_appEnvironment.WebRootPath + @"\Images" + game.ImageURL);
                    }
                    _context.Games.Find(id).ImageURL = Filename;
                    _context.SaveChanges();

                    return new ResultDTO
                    {
                        Message = "File is  saved",
                        Status = 200

                    };
                }
                else
                {
                    return new ResultErrorDTO
                    {
                        Message = "File is not saved",
                        Status = 405,
                        Errors = null
                    };
                }
            }

         

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("editGame")]
        public async Task<ResultDTO> EditGame([FromBody] GameDTO game)
        {
            if (_context.Games.FirstOrDefault(x => x.Id == game.Id) != null)
            {
                var games = _context.Games.FirstOrDefault(x => x.Id == game.Id);

                games.Title = game.Title;
                games.Price = game.Price;
                games.Description = game.Description;
                games.ImageURL = game.ImageURL;
                games.Year = game.Year;
                games.Developer = _context.Developers.FirstOrDefault(x => x.Name == game.Developer);
                games.Genre = _context.Genres.FirstOrDefault(x => x.Name == game.Genre);

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
        [HttpGet("editGame/{id}")]
        public GameDTO EditGetGame([FromRoute] int id)
        {

            var game = _context.Games.Include(y=> y.Developer).Include(z=>z.Genre).FirstOrDefault(x => x.Id == id);
            
              var gameDTO = new GameDTO()
            {
                Id = game.Id,
                Developer = game.Developer.Name,
                Genre = game.Genre.Name,
                Description = game.Description,
                ImageURL = game.ImageURL,
                Price = game.Price,
                Title = game.Title,
                Year = game.Year
            };

            return gameDTO;



         

        }
        
    }
}
