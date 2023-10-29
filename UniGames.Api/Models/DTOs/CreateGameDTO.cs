namespace UniGames.Api.Models.DTOs
{
    public class CreateGameDTO
    {
        public string Title { get; set; }
        public int PlatformID { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
