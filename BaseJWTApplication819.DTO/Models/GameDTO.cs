using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DTO.Models
{
   public class GameDTO
    {
       
        public int Id { get; set; } 
        public string Title { get; set; }
        public float Price { get; set; }
        public int Year { get; set; }
        public string ImageURL { get; set; }   
        public string Description { get; set; }
        public string Genre { get; set; }
        public string Developer { get; set; }
    }
}
