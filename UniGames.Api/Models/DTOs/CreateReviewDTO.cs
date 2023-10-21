using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class CreateReviewDTO
    {
        public string ReviewTitle { get; set; }
        public string ReviewDescription { get; set; }
        public short Score { get; set; }
        public int UserID { get; set; }
        public int GameID { get; set; }
    }
}
