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

        public DbSet<Game> Games {  get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<GameDetail> GameDetail { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasKey(gd => gd.UserId);

            modelBuilder.Entity<GameDetail>().HasKey(gd => gd.DetailID); // Defines the GameDetailID as the primary key
        }

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(e => e.UserId);
        }

    }
}
