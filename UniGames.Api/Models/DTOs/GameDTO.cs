using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class GameDTO
    {
        // For Each Line -- Displays as an output in Swagger
        public int GameID {  get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int UserID { get; set; }
        public Platform PlatformName { get; set; }
        public double AverageScore { get; set; }
    }
}
