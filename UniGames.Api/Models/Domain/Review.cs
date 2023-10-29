namespace UniGames.Api.Models.Domain
{
    public class Review
    {
        // For each line -- Defines what is gathered from the database (each variable name needs to match the name of
        // column names in the database)
        public int ReviewID { get; set; }
        public string ReviewTitle { get; set; }
        public string ReviewDescription { get; set;}
        public short Score { get; set;}
        public int UserID { get; set;}
        public int GameID { get; set;}
        public User UserName { get; set; }
        public Game Games { get; set;}

    }
}

