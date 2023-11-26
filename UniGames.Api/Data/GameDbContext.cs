using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Api.Data
{
    public class GameDbContext: DbContext
    {
        public GameDbContext(DbContextOptions dbContextOptions): base(dbContextOptions) 
        { 
        
        }

        // For Each Line -- Creates a DbSet for each database table and match it with the correct class
        public DbSet<Game> Games {  get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<GameDetail> GameDetail { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<User> User { get; set; }

        // An override for 'OnModelCreating' to configure database schema and relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Calls the 'OnModelCreating' method of the base class (DbContext)
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasKey(gd => gd.UserId); // Defines the UserID as the primary key
            modelBuilder.Entity<User>().Property(u => u.Userpassword).IsRequired();

            modelBuilder.Entity<GameDetail>().HasKey(gd => gd.DetailID); // Defines the GameDetailID as the primary key
        }      
    }
}
