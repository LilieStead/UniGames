using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Mappings;
using UniGames.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;
using UniGames.Data.Repositories;
using UniGames.Api.Data;

namespace UniGames.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateUsersController : ControllerBase
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IGameRepository gameRepository;

        public CreateUsersController(GameDbContext dbContext, IMapper mapper, IGameRepository gameRepository)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.gameRepository = gameRepository;
        }

        [HttpPost]
        public IActionResult CreateUsers([FromBody] CreateUsersDTO CreateUsersDTO)
        {
            var UsersDM = new Users
            {
                Userfname = CreateUsersDTO.Userfname,
                Userlname = CreateUsersDTO.Userlname,
                Useremail = CreateUsersDTO.Useremail,
                Username = CreateUsersDTO.Username,
                Userphone = CreateUsersDTO.Userphone,
                Userdob = CreateUsersDTO.Userdob,
                Userpassword = CreateUsersDTO.Userpassword,
            }

            dbContext.Users.Add(UsersDM);
            dbContext.SaveChanges();
            
            var CreateUsersDTO = new CreateUsersDTO
            {
                UserId = UsersDM.UserId,
                Userfname = UsersDM.Userfname,
                Userlname = UsersDM.Userlname,
                Useremail = UsersDM.Useremail,
                Username = UsersDM.Username,
                Userphone = UsersDM.Userphone,
                Userdob = UsersDM.Userdob,
                Userpassword = UsersDM.Userpassword,
            }

            return CreatedAtAction("GetUsersByID", new { id = CreateUsersDTO.UserId }, CreateUsersDTO);
        }

    }
}
