using Microsoft.EntityFrameworkCore;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;

namespace UniGames.Api.Repositories
{
    public class SQLReviewRepository : IReviewRepository
    {
        private readonly GameDbContext dbContext;

        // Constructor to use imported entities (such as the private readonly lines) throughout the file
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

        public List<Review> GetReviewByUser(int userId)
        {
            return dbContext.Review.Where(review => review.UserID == userId).Include(x => x.Games).Include(x => x.UserName).ToList();
        }

        public Review CreateReview(Review review)
        {

            dbContext.Review.Add(review);
            dbContext.SaveChanges();
            // Returns the review details where the ID is only the ID for this new game, and includes all details such as User details, Games and the Platform for the game
            // .ThenInclude() includes everything from the include before, the Games in this case (looks in the Game class in Game.cs)
            return dbContext.Review.Include(x => x.UserName).Include(x => x.Games).ThenInclude(g => g.PlatformName).FirstOrDefault(x => x.ReviewID == review.ReviewID);

        }

        public Review EditReview(int id)
        {
            var review = dbContext.Review.Include(x => x.UserName).FirstOrDefault(x => x.ReviewID == id);
            dbContext.SaveChanges();
            return review;
        }
        
        public List<Review> GetScoreByGameID(int id)
        {
        return dbContext.Review
            .Where(r => r.GameID == id)
            .Include(r=> r.UserName)
            .Include (r=> r.Games)
            .OrderByDescending(r => r.Score)
            .Take(5)
            .ToList();
        }
        public List<Review> GetReviewByUsername(string username)
        {
            return dbContext.Review.Where(review => review.UserName.Username.Contains(username) || review.UserName.Userfname.Contains(username)).Include(x => x.UserName).Include(x => x.Games).ToList();
        }

        public Review DeleteReview(Review review)
        {
            var user = dbContext.Review.Where(x => x.UserID == review.UserID).FirstOrDefault(x => x.ReviewID == review.ReviewID);
            dbContext.Review.Remove(user);
            dbContext.SaveChanges();
            return review;
        }



    }
}


