using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BaseJWTApplication819.DataAccess.Entity
{
    [Table("tblDeveloper")]

    public class Developer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        public virtual ICollection<Game> Games { get; set; }

        public Developer()
        {
            Games = new List<Game>();
        }
    }
}
