using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class UpdateGameDTO
    {
        public string Title { get; set; }
        public int PlatformID { get; set; }

        public int UserID { get; set; }

    }
}
