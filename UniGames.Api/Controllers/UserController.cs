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

        public UserController(GameDbContext dbContext,IMapper mapper, IUserRepository userRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.userRepository = userRepository;
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

            return CreatedAtAction("GetUsersByID", new { id = CreateUsersDTO.UserId }, CreateUsersDTO);
        }
    }
}   
