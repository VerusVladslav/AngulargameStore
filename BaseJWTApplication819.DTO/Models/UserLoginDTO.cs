using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BaseJWTApplication819.DTO.Models
{
    public class UserLoginDTO
    {

        [Required(ErrorMessage = "Email is requuired field")]
        [EmailAddress(ErrorMessage = "Invalid mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is requuired field")]
        public string Password { get; set; }
    }
}
