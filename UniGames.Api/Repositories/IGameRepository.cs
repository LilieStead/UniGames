using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Data.Repositories
{
    public interface IGameRepository
    {
        List<GameDTO> GetAllGames();
  
        Game GetGameById(int id);

        Game CreateGame(Game game);

        List<GameDTO> GetGamesByTitle(string title);

    }
}

