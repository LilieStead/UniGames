using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Models.Domain;

namespace UniGames.Data.Repositories
{
    public interface IGameDetailRepository
    {
        GameDetail GetDetailByID(int id);
        GameDetail CreateDetail(GameDetail gameDetail);
    }
}

