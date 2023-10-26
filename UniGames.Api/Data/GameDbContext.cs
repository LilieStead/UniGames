﻿using Microsoft.EntityFrameworkCore;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Data
{
    public class GameDbContext: DbContext
    {
        public GameDbContext(DbContextOptions dbContextOptions): base(dbContextOptions) 
        { 
        
        }

        public DbSet<Game> Games {  get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<User> User { get; set; }

        
    }
}
