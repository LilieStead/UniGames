using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;
using UniGames.Api.Models.Sessions;
using Microsoft.Extensions.Options;
using UniGames.Data.Repositories;
using BCryptNet = BCrypt.Net.BCrypt;

namespace UniGames.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;
        private readonly IGameRepository gameRepository;
        private readonly JwtService jwtService;

        public UserController(GameDbContext dbContext, IMapper mapper, IUserRepository userRepository, IGameRepository gameRepository, JwtService jwtService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.userRepository = userRepository;
            this.gameRepository = gameRepository;
            this.jwtService = jwtService;
        }

        [HttpGet("decodeToken")]
        public IActionResult DecodeToken([FromQuery] string jwtToken)
        {
            try
            {
                var decodedToken = jwtService.DecodeJwtAndGetUserId(jwtToken);
                

                if (decodedToken.UserId != null && decodedToken.UserName != null)
                {
                    return Ok(new { UserID = decodedToken.UserId, Username = decodedToken.UserName});
                }
                else
                {
                    return BadRequest(new { Message = "Failed to decode token" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while decoding the token", Error = ex.Message });
            }
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
        // Creates a new Method -- Previosuly called GetUserIDByName
        public IActionResult UserLogin([FromRoute] string password, string username)
        {
            // Selects the GetUserIDByName from the userRepository and uses the username
            var userDM = userRepository.GetUserIDByName(username);

            // If the username is invalid or null then
            if (userDM == null)
            {
                // Return that no user has been found
                return NotFound();
            }
            // Verify the plain text password to the value of the hashed password
            bool matchingPass = BCryptNet.Verify(password, userDM.Userpassword);
            // If the password for the username does not match the database records then
            if (!matchingPass)
            {
                // Return that the user is unauthorised
                return Unauthorized();
            }

            var jwtConfig = new JwtConfig();
            var userSessionGenerator = new UserSessionGenerator(jwtConfig);
            // Generates a user token for the login system
            string jwtToken = userSessionGenerator.GenerateJwtToken(userDM.UserId.ToString(), userDM.Username.ToString());

            HttpContext.Session.SetString("UserAuthenticated", "true");

            // Maps the DM to the DTO
            var userDTO = mapper.Map<UserDTO>(userDM);
            // Returns the correct user details
            return Ok(new { Token = jwtToken, User = userDTO});

        }

        [HttpGet]
        [Route("logout")]
        //[Authorize]
        public IActionResult Logout()
        {
            // Removes all authentication, session-related variables
            HttpContext.Session.Clear();
            


            return Ok(new { Message = "Logout was successful" });


        }


        [HttpPost]
        public IActionResult CreateUsers([FromBody] CreateUsersDTO CreateUserDTO)
        {

            if (ModelState.IsValid)
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

                string passHash = BCryptNet.HashPassword(UsersDM.Userpassword);
                UsersDM.Userpassword = passHash;
                //used to look for username
                var userExists = userRepository.GetUserIDByName(UsersDM.Username);
                var userEmail = userRepository.GetAllUsers().Where(x => x.Useremail == UsersDM.Useremail);

                // if statment looks for if the username exites in the databse
                if (userExists != null)
                {
                    //if it is then return bad request and error code to the front end and do not allow the methord to continue

                    return BadRequest("Username is taken");
                }
    
                foreach (var Users in userEmail) { 
                    if (Users != null)
                    {
                        return StatusCode(409, "Email is already being used");
                    }
                    
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
            else
            { 
                return StatusCode(422, ModelState);
            }

        }


        // Uses the HttpPut method
        [HttpPut]
        // Defines the Route
        [Route("/reset-password/{username}/{email}/{phone?}")]
        //[Authorize]
        // Public method -- also can be used to generally update a user password rather than saying 'reset'
        public IActionResult ResetUserPassword([FromRoute] string username, string email, string? phone, [FromBody] UpdatePasswordDTO updatePasswordDTO)
        {
            if (ModelState.IsValid)
            {
                // Uses the GetUserIDByName method from the userRepository
                var userDM = userRepository.GetUserIDByName(username);
                // If the username does not exist then
                if (userDM == null)
                {
                    // Return a not found error message
                    return NotFound("No User Found");
                }

                var validationObj = new List<ValidationDTO>();

                if (userDM.Useremail != email)
                {
                    validationObj.Add(new ValidationDTO
                    {
                        ErrorText = "Email Does Not Match User Records",
                        Type = "Email",
                    });
                }              
                if (userDM.Userphone != phone && phone != null)
                {

                    validationObj.Add(new ValidationDTO
                    {
                        ErrorText = "Phone Number Does Not Match Records",
                        Type = "Phone",
                    });

                }

                if (validationObj.Any())
                {
                    return BadRequest(validationObj);
                }
                string passHash = BCryptNet.HashPassword(updatePasswordDTO.Userpassword);
                updatePasswordDTO.Userpassword = passHash;

                // Map the userDM to the updatePasswordDTO
                mapper.Map(updatePasswordDTO, userDM);
                // And then save the changes
                dbContext.SaveChanges();
                // Maps the DM to the DTO
                var userDTO = mapper.Map<UserDTO>(userDM);
                // Returns as an output
                return Ok(userDTO);
            }
            else
            {
            
                return StatusCode(422, ModelState);
            }
            
        }

        // Uses the HttpDelete method
        [HttpDelete]
        // Defines the Route
        [Route("/delete/{username}/{password}")]
        //[Authorize]
        // Public method
        public IActionResult DeleteUser([FromRoute] string username, string password)
        {
            // Uses the GetUserById() method in userRepository and uses the id
            var userDM = userRepository.GetUserIDByName(username);
            // If no UserID is present then
            if (userDM == null)
            {
                // Return that no ID is found
                return NotFound("No User ID is found, please choose a valid ID");
            }
            if (userDM.Userpassword != password)
            {
                return Unauthorized();
            }

            var gamesDM = gameRepository.GetGameByUserID(userDM.UserId);
            if (gamesDM.Count > 0)
            {
                // Return a bad request and tell the user they cannot delete their account because they have previously created reviews for games
                return BadRequest("Cannot delete this user because they have created games, please delete the games first.");

            }

            HttpContext.Session.Remove("UserAuthenticated");
            // Gets the Review based on the User ID -- It only does this if a User ID is found
            //var userReviews = reviewRepository.GetReviewByUser(userDM.UserId);
            
            // If the user does not have a review, delete their account using the method in the userRepository
            var delUser = userRepository.DeleteUser(userDM);
            // Map the delete action to the DTO
            var userDTO = mapper.Map<UserDTO>(delUser);
            // Returns the results
            return Ok(userDTO);
        }
    }
}   
