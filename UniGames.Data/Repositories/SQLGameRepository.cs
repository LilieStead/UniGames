﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Data;
using UniGames.Data.Models.Domain;
using UniGames.Data.Models.DTOs;

namespace UniGames.Data.Repositories
{
    public class SQLGameRepository : IGameRepository
    {
        private readonly GameDbContext dbContext;

        public SQLGameRepository(GameDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Game> GetAllGames()
        {
            return dbContext.Games.ToList();
        }
    }
}
