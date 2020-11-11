using BaseJWTApplication819.DataAccess.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DataAccess
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) 
        {
          
        }

       // protected override void On
       
        public DbSet<Developer> Developers  { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<OrderList> OrderLists { get; set; }


        public DbSet<UserAdditionalInfo> UserAdditionalInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasOne(u => u.UserAdditionalInfo)
                .WithOne(t => t.User)
                .HasForeignKey<UserAdditionalInfo>(r => r.Id);


         



            builder.Entity<Game>()
                .HasOne(u => u.Genre)
                .WithMany(t => t.Games);

            builder.Entity<Game>()
                 .HasOne(u => u.Developer)
                 .WithMany(t => t.Games);

            base.OnModelCreating(builder);
        }

    }
}
