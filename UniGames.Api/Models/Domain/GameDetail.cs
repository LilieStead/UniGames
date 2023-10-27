using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.Domain
{
    public class GameDetail
    {
        public int DetailID { get; set; }
        public int GameID { get; set; }
        public string Description { get; set; }

        public string AgeRating { get; set; }
        public string Developer { get; set; }
        public string Genre { get; set; }


    }
}
