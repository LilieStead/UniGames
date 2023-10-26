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
using UniGames.Data.Repositories;

public class SqlReviewRepository : IReviewRepository
{
    private readonly GameDbContext dbcontext;

    public SqlReviewRepository(GameDbContext context)
    {
        dbcontext = context;
    }
    public List<Review> GetScoreByGameID(int id)
    {
        return dbcontext.Review
            .Where(r => r.GameID == id)
            .Include(r=> r.UserName)
            .OrderByDescending(r => r.Score)
            .Take(5)
            .ToList();
    }
}


