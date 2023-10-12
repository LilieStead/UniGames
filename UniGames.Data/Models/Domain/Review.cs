using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UniGames.Data.Models.Domain
{
    public class Review
    {
        public int ReviewID { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; }
        public int GameID { get; set; }
        public int UserID { get; set; }
    }
}
