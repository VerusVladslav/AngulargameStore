using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DataAccess.Entity;
using BaseJWTApplication819.Domain.Interfaces;
using BaseJWTApplication819.DTO.Helper;
using BaseJWTApplication819.DTO.Models;
using BaseJWTApplication819.DTO.Models.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaseJWTApplication819.Api_Angular.Controllers
{
    //localhost:12312/api/Account/
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTTokenService _jWTTokenService;
        private readonly IHttpContextAccessor _contextAccessor;


        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJWTTokenService jWTTokenService,
            IHttpContextAccessor contextAccessor
            )
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jWTTokenService = jWTTokenService;
            _contextAccessor = contextAccessor;
        }


        [HttpPost("register")]
        public async Task<ResultDTO> Register([FromBody]UserRegisterDTO model)
        {
            try
            {
               
                if (!ModelState.IsValid)
                {
                    return new ResultErrorDTO
                    {
                        Status = 403,
                        Message = "ERROR",
                        Errors = CustomValidator.GetErrorsByModel(ModelState)
                    };
                }

                var user = new User()
                {
                    UserName = model.Email,
                    Email = model.Email,
                    PhoneNumber = model.Phone
                };

                var userProfile = new UserAdditionalInfo()
                {
                    Address = model.Address,
                    Image = "default.jpg",
                    FullName = model.FullName,
                    Id = user.Id,
                    

                };


                IdentityResult result = await _userManager.CreateAsync(user, model.Password);


                if(!result.Succeeded)
                {
                    return new ResultErrorDTO
                    {
                        Message = "ERROR",
                        Status = 500,
                        Errors = CustomValidator.GetErrorsByIdentotyResult(result)
                    };
                }
                else
                {
                    result =  _userManager.AddToRoleAsync(user, "User").Result;
                    _context.UserAdditionalInfos.Add(userProfile);
                    _context.SaveChanges();
                }


                return new ResultDTO
                {
                    Status = 200,
                    Message = "OK"
                };
            }
            catch (Exception e)
            {
                return new ResultDTO {
                    Status = 500,
                    Message = e.Message,
                };

            }


        }



        [HttpPost("login")]
        public async Task<ResultDTO> Login([FromBody]UserLoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDTO
                {
                    Status = 403,
                    Message = "Invalid data for login",
                    Errors = CustomValidator.GetErrorsByModel(ModelState)

                };
            }

            //Переірка на успіх з логіном та паролем
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (!result.Succeeded)
            {
                return new ResultErrorDTO
                {
                    Status = 401,
                    Message = "Error",
                    Errors = new List<string>() {
                        "Incorrect login or password!"
                    }
                };
            }
            else
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                await _signInManager.SignInAsync(user,false);

                return new ResultLoginDTO
                {
                    Status = 200,
                    Message = "OK",
                    Token = _jWTTokenService.CreateToken(user)
                };
            }
        }

        [Authorize]
        [HttpPost("addToOrder/{userid}/{gameid}")]
        public async Task<ResultDTO> AddGame([FromRoute] int gameid, [FromRoute] string userid)
        {
            if (_context.Users.FirstOrDefault(x => x.Id == userid) != null)
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == userid);
                var userInfo =  _context.UserAdditionalInfos.FirstOrDefault(x => x.Id == user.Id);


                var game1 = _context.Games.Include(z=>z.Genre).Include(z => z.Developer)
                    .FirstOrDefault(x => x.Id == gameid);

               
               

                _context.UserAdditionalInfos.FirstOrDefault(x => x.Id == user.Id).Games.Add(game1);
           


                _context.OrderLists.Add(new OrderList
                {
                    Game = game1,
                    User = user
                });

                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Item added"
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
        [HttpGet("getOrderAllOrders")]
        public List<OrderListDTO> GetAllOrders()
        {

           
            var data = _context.OrderLists.Include(x=>x.Game).Select(t => new OrderListDTO
            {
                Id = t.Id,
                Game =new GameDTO {
                    Id = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Id,
                    Description = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Description,
                    Developer = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Developer.Name,
                    Genre = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Genre.Name,
                    ImageURL = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).ImageURL,
                    Price = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Price,
                    Title = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Title,
                    Year = _context.Games.Include(e => e.Genre).Include(q => q.Developer).FirstOrDefault(f => f.Id == t.Game.Id).Year
                },


                UserId = t.User.Id,
                UserLogin = t.User.UserName,
                IsAccept = t.IsAccept
            }).ToList();
           
               
                return data;
            
           
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("acceptOrder/{id}")]
        public async Task<ResultDTO> AcceptOrder([FromRoute] int id)
        {
            if (_context.OrderLists.FirstOrDefault(x => x.Id == id) != null)
            {

                var Order = _context.OrderLists.FirstOrDefault(x => x.Id == id);
                Order.IsAccept = true;



                await _context.SaveChangesAsync();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "Item added"
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
        [HttpGet("getOrderlist/{id}")]
        public List<GameDTO> GetGame([FromRoute] string id)
        {
            if (_context.Users.FirstOrDefault(x => x.Id == id) != null)
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == id);
                var userInfo = _context.UserAdditionalInfos.Include(z=>z.Games).ThenInclude(f=>f.Developer)
                    .Include(p=>p.Games).ThenInclude(r=>r.Genre)
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
                return list;
            }
            else return null;
        }



        [Authorize]
        [HttpPost("removeFromOrderlist/{userid}/{gameid}")]
        public async Task<ResultDTO> RemoveGame([FromRoute] int gameid, [FromRoute] string userid)
        {
            if (_context.Users.FirstOrDefault(x => x.Id == userid) != null)
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == userid);
                var userInfo = _context.UserAdditionalInfos.Include(z => z.Games).ThenInclude(f => f.Developer)
                    .Include(p => p.Games).ThenInclude(r => r.Genre).FirstOrDefault(x => x.Id == user.Id);

              
                var games= userInfo.Games.FirstOrDefault(z=>z.Id== gameid);
                userInfo.Games.Remove(games);

                var Order= _context.OrderLists.FirstOrDefault(x => x.User.Id == user.Id && x.Game.Id == games.Id);

                _context.OrderLists.Remove(Order);
               

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
        [Authorize]
        [HttpGet("getGameKey/{id}")]
        public ResultDTO GetGameKey([FromRoute] int id)
        {

            var game = _context.Games.Include(y => y.Developer).Include(z => z.Genre).FirstOrDefault(x => x.Id == id);

            return new ResultDTO
            {
                Message = game.GameKey
            };

        }
        [Authorize]
        [HttpGet("ifGameAccept/{iduser}/{idgame}")]
        public bool IsAccept([FromRoute] string iduser, [FromRoute] int idgame)
        {

            var order = _context.OrderLists.Include(y => y.Game).
                Include(z=>z.User).
                FirstOrDefault(x => x.User.Id == iduser && x.Game.Id==idgame);

            return order.IsAccept;

        }
       
    }
}