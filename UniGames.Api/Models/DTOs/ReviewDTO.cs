using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class ReviewDTO
    {
        public int ReviewID { get; set; }
        public string ReviewTitle { get; set; }
        public string ReviewDescription { get; set; }
        public short Score { get; set; }
        //public Game GameID { get; set; }
        public User Users { get; set; }
        public Game Games { get; set; }
        

    }
}
