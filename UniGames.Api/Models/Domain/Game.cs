namespace UniGames.Api.Models.Domain
{
    public class Game
    {
        
        public int GameID { get; set; }
        public string Title { get; set; }
        public int PlatformID { get; set; }
        public DateTime ReleaseDate { get; set; }

        public Platform PlatformName{ get; set; }

    }
}