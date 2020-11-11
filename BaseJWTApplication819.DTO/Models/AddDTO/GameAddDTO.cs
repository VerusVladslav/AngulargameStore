using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DTO.Models.AddDTO
{
   public class GameAddDTO
    {
        public string title { get; set; }

        public float price { get; set; }
        public int year { get; set; }


        public string imageURL { get; set; }

        public string description { get; set; }

        public string genre { get; set; }
        public string developer { get; set; }

    }
}
