using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;

namespace UniGames.Data.Repositories
{
    public interface IGameRepository
    {
        List<Game> GetAllGames();
        Game GetGameById(int id);

        Game CreateGame(Game game);

        List<Game> GetGamesByTitle(string title);

    }
}

