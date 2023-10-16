using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Data.Repositories
{
    public class SQLGameRepository : IGameRepository
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;

        public SQLGameRepository(GameDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;

        }

        public List<Game> GetAllGames()
        {
            var games = dbContext.Games.Include(x => x.PlatformName).ToList();
            return games;
        }
    }
}
