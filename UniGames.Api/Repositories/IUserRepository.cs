using UniGames.Api.Models.Domain;

namespace UniGames.Api.Repositories
{
    public interface IUserRepository
    {
        User GetUserById(int id);
        User GetUserIDByName(string username);

        User DeleteUser(User user);
    }
}
