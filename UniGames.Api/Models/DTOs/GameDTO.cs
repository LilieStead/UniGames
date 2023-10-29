using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class GameDTO
    {
        public int GameID {  get; set; }
        public string Title { get; set; }
        
        
        public DateTime ReleaseDate { get; set; }

        public Platform PlatformName { get; set; }
        

    }
}
