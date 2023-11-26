using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.DTOs
{
    public class UpdateUserDTO
    {
        [Required]
        public string Userfname { get; set; }
        [Required]
        public string Userlname { get; set; }
        [Required]
        public string Useremail { get; set; }
        public string Userphone { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Userdob { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
