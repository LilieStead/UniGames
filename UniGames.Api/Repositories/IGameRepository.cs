using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Data.Repositories
{
    // Public Interface For The Controllers
    public interface IGameRepository
    {
        // For Each Line -- Publicly Accessible Method Through The Interface
        List<GameDTO> GetAllGames();
  
        Game GetGameById(int id);

        Game CreateGame(Game game);

        Game UpdateGame(int id);

        List<GameDTO> GetGamesByTitle(string title);

        List<Game> GetGameByUserID(int id);

    }
}

