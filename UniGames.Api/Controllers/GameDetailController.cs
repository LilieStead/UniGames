using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Mappings;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Data.Repositories;

namespace UniGames.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameDetailController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IGameDetailRepository gamedetailRepository;

        public GameDetailController(GameDbContext dbContext, IMapper mapper, IGameDetailRepository gamedetailRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.gamedetailRepository = gamedetailRepository;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetDetailByID([FromRoute] int id) {
            var gamesdetailDM=gamedetailRepository.GetDetailByID(id);
            if (gamesdetailDM == null)
            {
                return NotFound();
            }

            var gamesdetailDTO=mapper.Map<GameDetailDTO>(gamesdetailDM);
            return Ok (gamesdetailDTO);
        }

        [HttpPost]
        public IActionResult CreateGameDetail([FromBody] CreateGameDetailDTO creategameDetailDTO)
        {
            var gameDetailDM = mapper.Map<GameDetail>(creategameDetailDTO);
            var existing = gamedetailRepository.GetDetailByID(creategameDetailDTO.GameID);
            if (existing != null)
            {
                return BadRequest("Game details exist for this game already");
            }
            
            var creGD = gamedetailRepository.CreateDetail(gameDetailDM);

            var gameDetailDTO = mapper.Map<GameDetailDTO>(creGD);
            return CreatedAtAction("GetDetailByID", new { id = gameDetailDTO.DetailID }, gameDetailDTO);

        }

        [HttpPut]
        [Route("/updatedetails/{id:int}")]
        public IActionResult UpdateGameDetail([FromRoute] int id, [FromBody]  UpdateGameDetailDTO updategameDetailDTO)
        {
            var gameDetailDM = gamedetailRepository.GetDetailByID(id);
            if (gameDetailDM == null)
            {
                return NotFound();
            }
            if (gameDetailDM.GameID != updategameDetailDTO.GameID)
            {
                return Unauthorized("The game IDs do not match");
            }

            this.mapper.Map(updategameDetailDTO, gameDetailDM);
            dbContext.SaveChanges();

            var gameDetailDTO = mapper.Map<GameDetailDTO>(gameDetailDM);
            return Ok(gameDetailDTO);

        }
    }
}