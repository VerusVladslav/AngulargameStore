using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DataAccess.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseJWTApplication819.Api_Angular.Helper
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
          IWebHostEnvironment env,
          IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole,context);
            }
        }
        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager,EFContext context)
        {

            context.Genres.Add(new Genre
            {
                Name="Action"
            });

            context.Genres.Add(new Genre
            {
                Name = "Shooter"
            });

            context.Genres.Add(new Genre
            {
                Name = "RPG"
            });

            context.Developers.Add(new Developer
            {
                Name = "Ubisoft"
            });

            context.Developers.Add(new Developer
            {
                Name = "CDproject red"
            });

            context.Developers.Add(new Developer
            {
                Name = "From software"
            });
            context.SaveChanges();

            context.Games.Add(new Game
            {
                GameKey = Guid.NewGuid().ToString(),
                Title = "Far cry 6",
                Price = 100,
                Description = "Descript",
                Year = 2021,
                ImageURL = "https://i0.wp.com/itc.ua/wp-content/uploads/2020/07/far-cry-6-art.jpg?fit=1200%2C1200&quality=100&strip=all&ssl=1",
                Developer = context.Developers.FirstOrDefault(x=>x.Name== "Ubisoft"),
                Genre=context.Genres.FirstOrDefault(x=>x.Name== "Shooter")

            }) ;

            context.Games.Add(new Game
            {
                GameKey = Guid.NewGuid().ToString(),
                Title = "Dark souls 3",
                Price = 100,
                Description = "Descript",
                Year = 2016,
                ImageURL = "https://hot-game.info/uploads/media/game/0001/34/thumb_33869_game_poster.jpeg",
                Developer = context.Developers.FirstOrDefault(x => x.Name == "From software"),
                Genre = context.Genres.FirstOrDefault(x => x.Name == "Action")

            });

            context.Games.Add(new Game
            {
                GameKey=Guid.NewGuid().ToString(),
                Title = "Cyberpunk 2077",
                Price = 100,
                Description = "Descript",
                Year = 2020,
                ImageURL = "https://images.g2a.com/newlayout/323x433/1x1x0/0ac929bd2e30/5d64d16146177c08243974c2",
                Developer = context.Developers.FirstOrDefault(x => x.Name == "CDproject red"),
                Genre = context.Genres.FirstOrDefault(x => x.Name == "Shooter")

            });

            context.SaveChanges();

            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;
              
            


            string email = "admin@gmail.com";
            var admin = new User
            {
                Email = email,
                UserName = email
            };
            var andrii = new User
            {
                Email = "cuanid236316@gmail.com",
                UserName = "cuanid236316@gmail.com"
            };

            var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
            resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;

            var resultAndrii = userManager.CreateAsync(andrii, "Qwerty1-").Result;
            resultAndrii = userManager.AddToRoleAsync(andrii, "User").Result;

              
                context.UserAdditionalInfos.Add(new UserAdditionalInfo
                {
                    Id = andrii.Id,
                    Address = "MyAddress",
                    Image = "default.jpg",
                    FullName = "MyFullName"
                });

                context.UserAdditionalInfos.Add(new UserAdditionalInfo
                {
                    Id = admin.Id,
                    Address = "MyAddress",
                    Image = "default.jpg",
                    FullName = "MyFullName"
                });

                context.SaveChanges();
            }
        }
    }
}
