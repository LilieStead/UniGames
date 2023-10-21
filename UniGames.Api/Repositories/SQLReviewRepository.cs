using Microsoft.EntityFrameworkCore;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;

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
            //return dbContext.Review.Include(x => x.Users).Include(x => x.Games).FirstOrDefault(x => x.ReviewID == id);
            return dbContext.Review.FirstOrDefault(x => x.ReviewID == id);
        }

        public Review CreateReview(Review review)
        {

            dbContext.Review.Add(review);
            dbContext.SaveChanges();
            return dbContext.Review.FirstOrDefault(x => x.ReviewID == review.ReviewID);

        }
    }
}
