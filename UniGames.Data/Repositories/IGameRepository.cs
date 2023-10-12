using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Data.Models.Domain;
using UniGames.Data;

namespace UniGames.Data.Repositories
{
    public interface IGameRepository
    {
        List<Game> GetAllGames();
    }
}
