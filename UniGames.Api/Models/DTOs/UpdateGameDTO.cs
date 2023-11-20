namespace UniGames.Api.Models.DTOs
{
    public class UpdateGameDTO
    {
        public string Title { get; set; }
        public int PlatformID { get; set; }

        public DateTime ReleaseDate { get; set; }

        public int UserID { get; set; }
    }
}
