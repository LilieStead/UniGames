namespace UniGames.Api.Models.Domain
{
    public class Game
    {
        // For each line -- Defines what is gathered from the database (each variable name needs to match the name of
        // column names in the database)
        public int GameID { get; set; }
        public string Title { get; set; }
        public int PlatformID { get; set; }
        public short Score { get; set; }
        public DateTime ReleaseDate { get; set; }

        // Navigation Properties
        public Platform PlatformName{ get; set; }


    }
}