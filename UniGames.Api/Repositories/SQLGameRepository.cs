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
using UniGames.Api.Repositories;

namespace UniGames.Data.Repositories
{
    public class SQLGameRepository : IGameRepository
    {
        // Uses GameDbContext as dbContext
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IReviewRepository reviewRepository;

        // Constructor to use imported entities (such as the private readonly lines) throughout the file
        public SQLGameRepository(GameDbContext dbContext, IMapper mapper, IReviewRepository reviewRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.reviewRepository = reviewRepository;

        }
        // Creates a new method to get all games
        public List<Game> GetAllGames()
        {
            // Returns all games and includes the platform details
            var games = dbContext.Games.Include(x => x.PlatformName).ToList();
            return games;
        }
        // Creates a new method to get games by their ID
        public Game GetGameById(int id)
        {
            // Returns the game based on its ID and the platform details
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

