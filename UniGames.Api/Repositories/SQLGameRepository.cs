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
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        //reviewRepository added to get the games score
        private readonly IReviewRepository reviewRepository;

        public SQLGameRepository(GameDbContext dbContext, IMapper mapper, IReviewRepository reviewRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.reviewRepository = reviewRepository;
   

        }

        // Uses GameDTO rather than Game so it directly adds to the DTO, but still fetches the data from Game
        public List<GameDTO> GetAllGames()
        {
            var games = dbContext.Games.Include(x => x.PlatformName).ToList();
            // Creates a new List using the GameDTO so it can be added to later
            var gamesDTOs = new List<GameDTO>();

            // For each game in the games table
            foreach (var game in games)
            {
                var gameId = game.GameID;
                // Gets the reviews where the GameID is the game ID in the database and adds it to a list (repeats for each game due to the foreach loop)
                var reviews = reviewRepository.GetReviews().Where(x => x.GameID == gameId).ToList();
                // Calculates the average score using the number of reviews for a specific game and the total of their scores
                double avgScore = reviews.Any() ? (double)reviews.Sum(r => r.Score) / reviews.Count() : 0;
                // Rounds the average score to 0 decimal places (presents as an integer)
                var newavg = Math.Round(avgScore);
                //var gameDTO = mapper.Map<List<GameDTO>>(avgScore).Where(x => x.AverageScore == newavg); ?? Could be done? Needs trying

                // Creates a new GameDTO using the exisitng GameDTO and includes the new average score
                var gameDTO = new GameDTO
                {
                    GameID = game.GameID,
                    Title = game.Title,
                    PlatformName = game.PlatformName,
                    ReleaseDate = game.ReleaseDate,
                    AverageScore = newavg,
                };
                // Adds the new GameDTO to the created GameDTO list earlier
                gamesDTOs.Add(gameDTO);
            }
            // Returns the new GameDTO list
            return gamesDTOs;
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
        // Uses GameDTO rather than Game so it directly adds to the DTO, but still fetches the data from Game
        public List<GameDTO> GetGamesByTitle(string title)
        {
            // Gets the games that contain the characters the user has input (case sentitive)
            var games = dbContext.Games.Where(x => x.Title.Contains(title)).Include(x => x.PlatformName).ToList();
            // Creates a new List using the GameDTO so it can be added to later
            var gamesDTOs = new List<GameDTO>();

            // For each game in the games table
            foreach (var game in games)
            {
                var gameId = game.GameID;
                // Gets the reviews where the GameID is the game ID in the database and adds it to a list (repeats for each game due to the foreach loop)
                var reviews = reviewRepository.GetReviews().Where(x => x.GameID == gameId).ToList();
                // Calculates the average score using the number of reviews for a specific game and the total of their scores
                double avgScore = reviews.Any() ? (double)reviews.Sum(r => r.Score) / reviews.Count() : 0;
                // Rounds the average score to 0 decimal places (presents as an integer)
                var newavg = Math.Round(avgScore);
                //var gameDTO = mapper.Map<List<GameDTO>>(avgScore);

                // Creates a new GameDTO using the exisitng GameDTO and includes the new average score
                var gameDTO = new GameDTO
                {
                    GameID = game.GameID,
                    Title = game.Title,
                    PlatformName = game.PlatformName,
                    AverageScore = newavg,
                };
                // Adds the new GameDTO to the created GameDTO list earlier
                gamesDTOs.Add(gameDTO);
            }
            // Returns the new GameDTO list
            return gamesDTOs;
        }


    }
}

