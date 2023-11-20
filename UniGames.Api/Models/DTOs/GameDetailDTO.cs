using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class GameDetailDTO
    {
        public int DetailID { get; set; }
        public int GameID { get; set; }
        public string Description { get; set; }
        public string AgeRating { get; set; }
        public string Developer { get; set; }
        public string Genre { get; set; }

        public Game Games { get; set; }
    }
}
