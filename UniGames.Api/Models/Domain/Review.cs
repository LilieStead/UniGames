namespace UniGames.Api.Models.Domain
{
    public class Review
    {
        public int ReviewID { get; set; }
        public string ReviewTitle { get; set;}
        public string ReviewDescription { get; set;}
        public short Score { get; set;}
        public int UserID { get; set; }
        
        public Game Game { get; set;}
    }
}
