using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Api.Repositories
{
    public interface IUserRepository
    {
        User GetUserById(int id);
        User GetUserIDByName(string username);

        List<User> GetAllUsers();
        User DeleteUser(User user);

    }
}
