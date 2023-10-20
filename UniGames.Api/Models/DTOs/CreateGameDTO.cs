namespace UniGames.Api.Models.DTOs
{
    public class CreateGameDTO
    {
        public string Title { get; set; }
        public int PlatformID { get; set; }
        public short Score { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
