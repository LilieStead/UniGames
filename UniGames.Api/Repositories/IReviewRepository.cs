using UniGames.Api.Models.Domain;

namespace UniGames.Api.Repositories
{
    public interface IReviewRepository
    {
        List<Review> GetReviews();
        Review GetReviewByID(int id);
        Review CreateReview(Review review);

        List<Review> GetReviewByUser(int userId);
        List<Review> GetScoreByGameID(int id);

    }
}


