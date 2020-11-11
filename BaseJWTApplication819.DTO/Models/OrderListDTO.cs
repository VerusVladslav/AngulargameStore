using BaseJWTApplication819.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DTO.Models
{
   public class OrderListDTO
    {
        public int Id { get; set; }

        public  string UserId { get; set; }
        public string UserLogin { get; set; }


        public GameDTO Game { get; set; }

        public bool IsAccept { get; set; }

       
    }
}
