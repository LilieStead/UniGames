using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.DTOs
{
    public class CreateGameDetailDTO
    {
        [Required]
        public int GameID { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string AgeRating { get; set; }
        [Required]
        public string Developer { get; set; }
        [Required]
        public string Genre { get; set; }
    }
}
