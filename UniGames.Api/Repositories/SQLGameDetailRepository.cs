using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Data.Repositories
{
    public class SQLGameDetailRepository : IGameDetailRepository
    {
        private readonly GameDbContext dbContext;
        private readonly IMapper mapper;

        public SQLGameDetailRepository(GameDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }
        public GameDetail GetDetailByID(int id)
        {
            return dbContext.GameDetail.FirstOrDefault(x => x.GameID == id);
        }

        public GameDetail CreateDetail(GameDetail gameDetail)
        {
            dbContext.GameDetail.Add(gameDetail);
            dbContext.SaveChanges();
            return gameDetail ;
        }
    }
}
