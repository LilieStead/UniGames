using AutoMapper;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;


namespace UniGames.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IReviewRepository reviewRepository;
        private readonly IUserRepository userRepository;


        public ReviewController(GameDbContext dbContext, IMapper mapper, IReviewRepository reviewRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.reviewRepository = reviewRepository;
            this.userRepository = userRepository;
        }



        // Uses the HttpGet method
        [HttpGet]
        // Defines the Route
        [Route("/reviewid/{id:int}")]
        // Public Method
        public IActionResult GetReviewByID([FromRoute] int id)
        {
            // Uses the GetReviewByID in the reviewRepository 
            var reviewDM = reviewRepository.GetReviewByID(id);
            // If there is no valid Review ID then
            if (reviewDM == null)
            {
                // Return that no review with that ID was found
                return NotFound();
            }
            // Maps the DM to the DTO
            var reviewDTO = mapper.Map<ReviewDTO>(reviewDM);
            // Returns the results
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



        // Uses the HttpPost method
        [HttpPost]
        // Public Method
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

