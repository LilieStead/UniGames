using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.DTOs;
using UniGames.Api.Repositories;

namespace UniGames.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GameDbContext DbContext;
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;

        public UserController(GameDbContext dbContext,IMapper mapper, IUserRepository userRepository)
        {
            DbContext = dbContext;
            this.mapper = mapper;
            this.userRepository = userRepository;
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
    }
}
