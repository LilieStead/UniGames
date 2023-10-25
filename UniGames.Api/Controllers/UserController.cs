using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Data.Repositories;

namespace UniGames.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

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
            public IActionResult CreateUsers([FromBody] CreateUsersDTO CreateUserDTO)
            {
                var UsersDM = new Users
                {
                    Userfname = CreateUserDTO.Userfname,
                    Userlname = CreateUserDTO.Userlname,
                    Useremail = CreateUserDTO.Useremail,
                    Username = CreateUserDTO.Username,
                    Userphone = CreateUserDTO.Userphone,
                    Userdob = CreateUserDTO.Userdob,
                    Userpassword = CreateUserDTO.Userpassword,
                };

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
                };

                return CreatedAtAction("GetUsersByID", new { id = CreateUsersDTO.UserId }, CreateUsersDTO);
            }

        }
    }
}
}
