using Microsoft.EntityFrameworkCore;
using UniGames.Data.Models.Domain;

namespace UniGames.Api.Data
{
    public class GameDbContext: DbContext
    {
        public GameDbContext(DbContextOptions dbContextOptions): base(dbContextOptions) 
        { 
        
        }

        public DbSet<Game> Games {  get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}
