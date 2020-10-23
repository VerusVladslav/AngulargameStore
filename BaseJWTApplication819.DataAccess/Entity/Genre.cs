using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BaseJWTApplication819.DataAccess.Entity
{
    [Table("tblGenre")]
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        //NavigationProperty Props
        public virtual ICollection<Game> Games { get; set; }
        public Genre()
        {
            Games = new List<Game>();
        }
    }

}
