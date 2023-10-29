using AutoMapper;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;


namespace UniGames.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ReviewController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IReviewRepository reviewRepository;
        private readonly IUserRepository userRepository;
        public ReviewController(GameDbContext dbContext, IMapper mapper, IReviewRepository reviewRepository, IUserRepository userRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.reviewRepository = reviewRepository;
            this.userRepository = userRepository;
        }



        [HttpGet]
        [Route("/reviewid/{id:int}")]
        public IActionResult GetReviewByID([FromRoute] int id)
        {
          var reviewDM = reviewRepository.GetReviewByID(id);
          if (reviewDM == null)
          {
              return NotFound();
          }

          var reviewDTO = mapper.Map<ReviewDTO>(reviewDM);
          return Ok(reviewDTO);
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


        [HttpPost]
        public IActionResult CreateReview([FromBody] CreateReviewDTO createReviewDTO)
        {
            // Map DTO to DM
            var reviewDM = mapper.Map<Review>(createReviewDTO);
            // Execute the Create Review Method
            var crreview = reviewRepository.CreateReview(reviewDM);

            // Map DM to DTO
            var reviewDTO = mapper.Map<ReviewDTO>(crreview);
            // Uses the GetReviewByID to match the new review's ID and pull it and all review details through the output
            return CreatedAtAction("GetReviewByID", new { id = reviewDTO.ReviewID }, reviewDTO);
        
    
        }
        [HttpGet]
        [Route("/userreview/{username}")]
        public IActionResult GetReviewByUsername([FromRoute] string username) {
            var reviewDM = reviewRepository.GetReviewByUsername(username);
            if (reviewDM == null){ 
                return NotFound();
            }
            var reviewDTO = mapper.Map<List<ReviewDTO>>(reviewDM);
            return Ok(reviewDTO);
        }
    }
}

