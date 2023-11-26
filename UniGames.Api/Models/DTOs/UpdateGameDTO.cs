using System.ComponentModel.DataAnnotations;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class UpdateGameDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public int PlatformID { get; set; }
        [Required]
        public int UserID { get; set; }

    }
}
