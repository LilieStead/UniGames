using UniGames.Api.Models.Domain;

namespace UniGames.Api.Repositories
{
    public interface IReviewRepository
    {
        List<Review> GetReviews();
        Review GetReviewByID(int id);
        Review CreateReview(Review review);
      
        public List<Review> GetScoreByGameID(int id);
        public List<Review> GetReviewByUsername(string username);

        List<Review> GetReviewByUser(int userId);
    }
}


