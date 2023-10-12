namespace UniGames.Data.Models.Domain
{
    public class Game
    {
        
        public int GameID { get; set; }
        public string Title { get; set; }
        public string Platform { get; set; }
        public short Score { get; set; }
        public DateTime ReleaseDate { get; set; }

    }
}