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

        public Review CreateReview(Review review)
        {

            dbContext.Reviews.Add(review);

        }
    }
}
