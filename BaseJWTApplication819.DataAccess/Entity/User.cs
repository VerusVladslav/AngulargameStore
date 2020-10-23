using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DataAccess.Entity
{
    public class User : IdentityUser
    {
        public  virtual UserAdditionalInfo UserAdditionalInfo { get; set; }
    }
}
