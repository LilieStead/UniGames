using System.ComponentModel.DataAnnotations;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class CreateReviewDTO
    {
        [Required]
        public string ReviewTitle { get; set; }
        [Required]
        [MaxLength(500, ErrorMessage = "Review Descriptions cannot have more than 500 characters")]
        public string ReviewDescription { get; set; }
        [Required]
        public short Score { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int GameID { get; set; }

    }
}
