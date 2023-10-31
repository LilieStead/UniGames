using Microsoft.EntityFrameworkCore;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Repositories
{
    public class SQLUserRepository : IUserRepository
    {
        private readonly GameDbContext dbContext;
        
        public SQLUserRepository(GameDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public User GetUserById(int id)
        {
            return dbContext.User.FirstOrDefault(x => x.UserId == id);
        }

        // Creates a new method
        public User GetUserIDByName(string username)
        {
            // Uses the dbContext class to match the username to records in the database 
            return dbContext.User.FirstOrDefault(u => u.Username == username);
        }


        public User DeleteUser(User user)
        {
            dbContext.User.Remove(user);
            dbContext.SaveChanges();
            return user;
        }
    }
}
