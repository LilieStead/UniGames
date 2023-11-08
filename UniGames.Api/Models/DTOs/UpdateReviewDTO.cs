using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class UpdateReviewDTO
    {
        public string ReviewTitle { get; set; }
        public string ReviewDescription { get; set; }
        public short Score { get; set; }

    }
}

