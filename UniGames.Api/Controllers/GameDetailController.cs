using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Mappings;
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
    }
}