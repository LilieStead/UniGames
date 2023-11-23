using System.ComponentModel.DataAnnotations;
using UniGames.Api.Models.Validators;

namespace UniGames.Api.Models.DTOs
{
    public class UpdateReviewDTO
    {
        [Required]
        public string ReviewTitle { get; set; }
        [ReviewDescriptionValidator]
        public string ReviewDescription { get; set; }
        [Required]
        public short Score { get; set; }
        [Required]
        public int UserID { get; set; }
        //[Required]
        //public int GameID { get; set; }
    }
}
