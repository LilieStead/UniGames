using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;
using BCryptNet = BCrypt.Net.BCrypt;

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
        //[Authorize]
        // Public Method
        public IActionResult CreateReview([FromBody] CreateReviewDTO createReviewDTO)
        {
            if (ModelState.IsValid)
            {
                // Map DTO to DM
                var reviewDM = mapper.Map<Review>(createReviewDTO);

                var reviewExists = reviewRepository.GetReviewByUser(reviewDM.UserID);
                if (reviewExists != null)
                {
                    return Conflict();
                }

                // Execute the Create Review Method
                var crreview = reviewRepository.CreateReview(reviewDM);

                // Map DM to DTO
                var reviewDTO = mapper.Map<ReviewDTO>(crreview);
                // Uses the GetReviewByID to match the new review's ID and pull it and all review details through the output
                return CreatedAtAction("GetReviewByID", new { id = reviewDTO.ReviewID }, reviewDTO);
            }
            else
            {
                return StatusCode(422, ModelState);
                
            }
            

        }

        [HttpPut]
        [Route("/editreview/{id:int}")]
        public IActionResult EditReview([FromRoute] int id, [FromBody] UpdateReviewDTO updateReviewDTO)
        {
            if (ModelState.IsValid)
            {
                var reviewDM = reviewRepository.GetReviewByID(id);
                if (reviewDM == null)
                {
                    return NotFound();
                }
                if (reviewDM.UserID != updateReviewDTO.UserID)
                {
                    return Unauthorized("User is editing the wrong review");
                }
                /*if (reviewDM.GameID != updateReviewDTO.GameID)
                {
                    return BadRequest("User is attempting to update the game ID for this review");
                }*/

                this.mapper.Map(updateReviewDTO, reviewDM);
                dbContext.SaveChanges();

                var reviewDTO = mapper.Map<ReviewDTO>(reviewDM);
                return Ok(reviewDTO);
            }
            else
            {
                return StatusCode(500, new { Message = "Illegal method of editing a review attempted"});
            }   
        }

        [HttpGet]
        [Route("/userreview/{id:int}")]
        public IActionResult GetReviewByUserID([FromRoute] int id)
        {
            var reviewDM = reviewRepository.GetReviewByUser(id);
            if (reviewDM == null)
            {
                return NotFound();
            }
            var reviewDTO = mapper.Map<List<ReviewDTO>>(reviewDM);
            return Ok(reviewDTO);
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

        [HttpDelete]
        [Route ("/deletereview/{userID:int}/{id:int}/{password}")]
        //[Authorize]
        public IActionResult DeleteReview([FromRoute] int userID, int id, string password) {
            
            var reviewdm = reviewRepository.GetReviewByID(id);
            if (reviewdm == null)
            {
                return NotFound();
            }
            if (reviewdm.UserID != userID)
            {
                return BadRequest();
            }

            bool matchingPass = BCryptNet.Verify(password, reviewdm.UserName.Userpassword);
            // If the password for the username does not match the database records then
            if (!matchingPass)
            {
                // Return that the user is unauthorised
                return Unauthorized();
            }


            var delreview = reviewRepository.DeleteReview(reviewdm);
            var reviewdto = mapper.Map<ReviewDTO>(delreview);
            return Ok(reviewdto);
        } 

    }
}

