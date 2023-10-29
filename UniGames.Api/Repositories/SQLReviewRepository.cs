using Microsoft.EntityFrameworkCore;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Api.Repositories
{
    public class SQLReviewRepository : IReviewRepository
    {
        private readonly GameDbContext dbContext;

        public SQLReviewRepository(GameDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        
        public List<Review> GetReviews()
        {
            var games = dbContext.Review.ToList();
            return games;
        }

        public Review GetReviewByID(int id)
        {
            // Returns the review details where the ID is only the ID for this new game, and includes all details such as User details, Games and the Platform for the game
            // .ThenInclude() includes everything from the include before, the Games in this case (looks in the Game class in Game.cs)
            return dbContext.Review.Include(x => x.UserName).Include(x => x.Games).ThenInclude(g => g.PlatformName).FirstOrDefault(x => x.ReviewID == id);
        }

        public Review CreateReview(Review review)
        {

            dbContext.Review.Add(review);
            dbContext.SaveChanges();
            // Returns the review details where the ID is only the ID for this new game, and includes all details such as User details, Games and the Platform for the game
            // .ThenInclude() includes everything from the include before, the Games in this case (looks in the Game class in Game.cs)
            return dbContext.Review.Include(x => x.UserName).Include(x => x.Games).ThenInclude(g => g.PlatformName).FirstOrDefault(x => x.ReviewID == review.ReviewID);

        }
        
        
        public List<Review> GetScoreByGameID(int id)
        {
        return dbContext.Review
            .Where(r => r.GameID == id)
            .Include(r=> r.UserName)
            .OrderByDescending(r => r.Score)
            .Take(5)
            .ToList();
        }
        public List<Review> GetReviewByUsername(string username)
        {
            return dbContext.Review.Where(review =>  review.UserName.Username == username).Include(x => x.UserName).ToList();
        }
    }
}


