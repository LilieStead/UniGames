namespace UniGames.Api.Models.DTOs
{
    public class CreateGameDetailDTO
    {
        public int GameID { get; set; }
        public string Description { get; set; }
        public string AgeRating { get; set; }
        public string Developer { get; set; }
        public string Genre { get; set; }
    }
}
