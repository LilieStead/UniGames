using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UniGames.Data.Models.DTOs
{
    public class GameDTO
    {
        public int GameID {  get; set; }
        public string Title { get; set; }
        public string Platform { get; set; }
        public short Score { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
