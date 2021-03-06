﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BaseJWTApplication819.DataAccess.Entity
{
    [Table("tblGame")]
   public class Game
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public float Price { get; set; }
        public int Year { get; set; }

        [Required]
        public string ImageURL { get; set; }
        [Required]
        public string Description { get; set; }

        [Required]
        public string GameKey { get; set; }

        public virtual Genre Genre { get; set; }
        public virtual Developer Developer { get; set; }
    }
}
