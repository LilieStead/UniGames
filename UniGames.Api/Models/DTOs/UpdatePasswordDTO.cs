using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.DTOs
{
    public class UpdatePasswordDTO
    {
        [Required]
        public string Userpassword { get; set; }
    }
}
