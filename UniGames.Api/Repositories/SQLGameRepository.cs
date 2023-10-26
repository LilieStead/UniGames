using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
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

            return games.ToList();
        }

        public Game GetGameById(int id)
        {
            return dbContext.Games.Include(x => x.PlatformName).FirstOrDefault(x => x.GameID == id);
        }

        public Game CreateGame(Game game)
        {
            dbContext.Games.Add(game);
            dbContext.SaveChanges();
            return dbContext.Games.Include(x => x.PlatformName).FirstOrDefault(x => x.GameID == game.GameID);

        }
        public List<Game> GetGamesByTitle(string title)
        { 
            var games =  dbContext.Games.Where(x => x.Title == title).Include(x => x.PlatformName).ToList();
            return games;

        }
    }
}

