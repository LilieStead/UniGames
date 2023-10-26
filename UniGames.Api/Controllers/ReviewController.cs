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
    public class ReviewController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IReviewRepository reviewRepository;

        public ReviewController(GameDbContext dbContext, IMapper mapper, IReviewRepository reviewRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.reviewRepository = reviewRepository;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetScoreByGameID([FromRoute] int id)
        {
            var reviewDM = reviewRepository.GetScoreByGameID(id);
            if (reviewDM == null)
            {
                return NotFound();
            }
            var reviewDTO = mapper.Map<List<ReviewDTO>>(reviewDM);
            return Ok(reviewDTO);
        }
    }
}