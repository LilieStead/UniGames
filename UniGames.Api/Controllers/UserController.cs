using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Numerics;
using System;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;
using System.Net;

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

        // Uses the HttpGet Method
        [HttpGet]
        // Decides the route, using a username and password
        [Route("{username}/{password}")]
        // Creates a new Method
        public IActionResult GetUserIdByName([FromRoute] string password, string username)
        {
            // Selects the GetUserIDByName from the userRepository and uses the username
            var userDM = userRepository.GetUserIDByName(username);

            // If the username is invalid or null then
            if (userDM == null)
            {
                // Return that no user has been found
                return NotFound();
            }
            // If the password for the username does not match the database records then
            if (userDM.Userpassword != password)
            {
                // Return that the user is unauthorised
                return Unauthorized();
            }
            // Maps the DM to the DTO
            var userDTO = mapper.Map<UserDTO>(userDM);
            // Returns the correct user details
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
            // if statment looks for if the username exites in the databse
            if (UsersDM !=null) { 
                //if it is then reutn bad request and error code to the front end and do not allow the methord to continue
            return BadRequest("Username is taken");
                    }
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


        // Uses the HttpPut method
        [HttpPut]
        // Defines the Route
        [Route("/reset-password/{username}/{email}/{phone?}")]
        // Public method -- also can be used to generally update a user password rather than saying 'reset'
        public IActionResult ResetUserPassword([FromRoute] string username, string email, string? phone, [FromBody] UpdatePasswordDTO updatePasswordDTO)
        {
            // Uses the GetUserIDByName method from the userRepository
            var userDM = userRepository.GetUserIDByName(username);
            // If the username does not exist then
            if (userDM == null)
            {
                // Return a not found error message
                return BadRequest("No User Found");
            }
            
            if (userDM.Useremail != email)
            {
               
                return Unauthorized("Email address does not match database records");
            }
            if (userDM.Username == username && userDM.Useremail == email && userDM.Userphone != phone && phone != null)
            {
                return StatusCode(409, "Conflict With Incorrect User Phone Number");
              
            }

            // Map the userDM to the updatePasswordDTO
            mapper.Map(updatePasswordDTO, userDM);
            // And then save the changes
            dbContext.SaveChanges();
            // Maps the DM to the DTO
            var userDTO = mapper.Map<UserDTO>(userDM);
            // Returns as an output
            return Ok(userDTO);
        }

        // Uses the HttpDelete method
        [HttpDelete]
        // Defines the Route
        [Route("/delete/{username}")]
        // Public method
        public IActionResult DeleteUser([FromRoute] string username)
        {
            // Uses the GetUserById() method in userRepository and uses the id
            var userDM = userRepository.GetUserIDByName(username);
            // If no UserID is present then
            if (userDM == null)
            {
                // Return that no ID is found
                return NotFound("No User ID is found, please choose a valid ID");
            }
            // Gets the Review based on the User ID -- It only does this if a User ID is found
            var userReviews = reviewRepository.GetReviewByUser(userDM.UserId);
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
