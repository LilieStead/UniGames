using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;

namespace UniGames.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;
        private readonly IReviewRepository reviewRepository;

        public UserController(GameDbContext dbContext, IMapper mapper, IUserRepository userRepository, IReviewRepository reviewRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.userRepository = userRepository;
            this.reviewRepository = reviewRepository;
        }


        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetUserById([FromRoute] int id)
        {
            var userDM = userRepository.GetUserById(id);
            if (userDM == null)
            {
                return NotFound();
            }

            var userDTO = mapper.Map<UserDTO>(userDM);
            return Ok(userDTO);
        }

        [HttpGet]
        [Route("{username}/{password}")]
        public IActionResult GetUserIdByName([FromRoute] string password, string username)
        {
            var userDM = userRepository.GetUserIDByName(username);



            if (userDM == null)
            {
                return NotFound();
            }

            if (userDM.Userpassword != password)
            {
                return Unauthorized();
            }

            var userDTO = mapper.Map<UserDTO>(userDM);

            return Ok(userDTO);

        }


        [HttpPost]
        public IActionResult CreateUsers([FromBody] CreateUsersDTO CreateUserDTO)
        {
            var UsersDM = new User
            {
                Userfname = CreateUserDTO.Userfname,
                Userlname = CreateUserDTO.Userlname,
                Useremail = CreateUserDTO.Useremail,
                Username = CreateUserDTO.Username,
                Userphone = CreateUserDTO.Userphone,
                Userdob = CreateUserDTO.Userdob,
                Userpassword = CreateUserDTO.Userpassword,
            };

            dbContext.User.Add(UsersDM);
            dbContext.SaveChanges();

            var CreateUsersDTO = new UserDTO
            {
                UserId = UsersDM.UserId,
                Userfname = UsersDM.Userfname,
                Userlname = UsersDM.Userlname,
                Useremail = UsersDM.Useremail,
                Username = UsersDM.Username,
                Userphone = UsersDM.Userphone,
                Userdob = UsersDM.Userdob,
                Userpassword = UsersDM.Userpassword,
            };

            return CreatedAtAction("GetUserById", new { id = CreateUsersDTO.UserId }, CreateUsersDTO);
        }

        // Uses the HttpDelete method
        [HttpDelete]
        // Defines the Route
        [Route("/delete/{id:int}")]
        // Public method
        public IActionResult DeleteUser([FromRoute] int id)
        {
            // Uses the GetUserById() method in userRepository and uses the id
            var userDM = userRepository.GetUserById(id);
            // If no UserID is present then
            if (userDM == null)
            {
                // Return that no ID is found
                return NotFound("No User ID is found, please choose a valid ID");
            }
            // Gets the Review based on the User ID -- It only does this if a User ID is found
            var userReviews = reviewRepository.GetReviewByUser(id);
            // If there are any reviews present in the database then
            if (userReviews.Count > 0)
            {
                // Return a bad request and tell the user they cannot delete their account because they have previously created reviews for games
                return BadRequest("Cannot delete this user because they have created reviews for games, please delete these reviews first.");
            }
            // If the user does not have a review, delete their account using the method in the userRepository
            var delUser = userRepository.DeleteUser(userDM);
            // Map the delete action to the DTO
            var userDTO = mapper.Map<UserDTO>(delUser);
            // Returns the results
            return Ok(userDTO);
        }
    }
}   
