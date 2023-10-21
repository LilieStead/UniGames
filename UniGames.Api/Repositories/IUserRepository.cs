using UniGames.Api.Models.Domain;

namespace UniGames.Api.Repositories
{
    public interface IUserRepository
    {
        User GetUserIDByName(string username);
    }
}
