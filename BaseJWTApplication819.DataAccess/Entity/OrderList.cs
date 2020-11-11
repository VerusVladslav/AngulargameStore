using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BaseJWTApplication819.DataAccess.Entity
{
    [Table("tblRoderList")]

    public class OrderList
    {
        [Key]
        public int Id { get; set; }
        
        public virtual User User { get; set; }
        
        public virtual Game Game { get; set; }

        public bool  IsAccept  { get; set; }

        public OrderList()
        {
            IsAccept = false;
        }
    }
}
