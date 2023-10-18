using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Mappings;
using UniGames.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Data.Repositories;


namespace UniGames.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IGameRepository gameRepository;

        public GameController(GameDbContext dbContext, IMapper mapper, IGameRepository gameRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.gameRepository = gameRepository;
        }

        [HttpGet(Name = "GetGames")]
        public IActionResult GetAllGames()
        {
            // Uses the game repository and the selected method inside
            var gamesDM = gameRepository.GetAllGames();

            // Map DM to DTO
            var gamesDTO = mapper.Map<List<GameDTO>>(gamesDM);

            return Ok(gamesDTO.Take(20));
        }


        [HttpGet]
        [Route("{title}")]
        public IActionResult GetGamesByTitle([FromRoute] string title) 
        {
            //var gameDM = gameRepository.GetGamesByTitle(title);
            //var gameDM = gameRepository.GetAllGames().Contains( ==title );
            var gameDM = gameRepository.GetAllGames().Where(x => x.Title.Contains(title)).ToList();
            //var gameDM = gameRepository.GetAllGames();

            
            
            if (gameDM == null)
            {
                return NotFound();
            }
            var gameDTO = mapper.Map<List<GameDTO>>(gameDM);
            
            return Ok(gameDTO);
        }



    }
}