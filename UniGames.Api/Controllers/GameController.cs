using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Mappings;
using UniGames.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Data.Repositories;
using UniGames.Api.Repositories;
using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Authorization;

namespace UniGames.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {

        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IGameRepository gameRepository;
        private readonly IReviewRepository reviewRepository;


        public GameController(GameDbContext dbContext, IMapper mapper, IGameRepository gameRepository, IReviewRepository reviewRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.gameRepository = gameRepository;
            this.reviewRepository = reviewRepository;
        }

        [HttpGet(Name = "GetGames")]
        public IActionResult GetAllGames()
        {
            // Uses the game repository and the selected method inside
            var gamesDM = gameRepository.GetAllGames();
            
            // Maps the DM to DTO
            var gamesDTO = mapper.Map<List<GameDTO>>(gamesDM);

            return Ok(gamesDTO.OrderByDescending(r => r.AverageScore ).Take(20));

        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetGameById([FromRoute]int id)
        {
            var gamesDM = gameRepository.GetGameById(id);

            if (gamesDM == null)
            {
                return NotFound();
            }
            var gamesDTO = mapper.Map<GameDTO>(gamesDM);
            return Ok(gamesDTO);
        }

        [HttpPost]
        //[Authorize]
        public IActionResult CreateGame([FromBody] CreateGameDTO createGameDTO)
        {
            if (ModelState.IsValid)
            {
                var gamesDM = mapper.Map<Game>(createGameDTO);
                
                var create = gameRepository.CreateGame(gamesDM);
                var gamesDTO = mapper.Map<GameDTO>(create);
                return CreatedAtAction("GetGameById", new
                {
                    id = gamesDTO.GameID
                }, gamesDTO);
            }
            else
            {
                return BadRequest();
            }
            
        }

        [HttpPut]
        [Route("/update-game/{id:int}")]
        //[Authorize]
        public IActionResult UpdateGame([FromRoute] int id, [FromBody] UpdateGameDTO updateGameDTO)
        {
            var gamesDM = gameRepository.GetGameById(id);
            if (gamesDM == null)
            {
                return NotFound();
            }
            if (gamesDM.UserID != updateGameDTO.UserID)
            {
                return Unauthorized();
            }

            this.mapper.Map(updateGameDTO, gamesDM);
            dbContext.SaveChanges();

            var gamesDTO = mapper.Map<GameDTO>(gamesDM);
            return Ok(gamesDTO);

        }



        [HttpGet]
        [Route("{title}")]
        public IActionResult GetGamesByTitle([FromRoute] string title)
        {
            // Looks in the IGameRepository file for the GetGamesByTitle method
            var gamesWithAvgScore = gameRepository.GetGamesByTitle(title);
            if (gamesWithAvgScore == null)
            {
                return NotFound();
            }

            //var gamesDTO = mapper.Map<List<GameDTO>>(gamesWithAvgScore);
            // Returns it into the API interface
            return Ok(gamesWithAvgScore);

        }


        [HttpGet]
        [Route("/userid/{id:int}")]
        public IActionResult GetUserGames([FromRoute] int id)
        {
            var gameDM = gameRepository.GetGameByUserID(id);
            if (gameDM == null)
            {
                return NotFound();
            }

            var gameDTO = mapper.Map<List<GameDTO>>(gameDM);

            return Ok(gameDTO);
        }
    }




}


