using System.ComponentModel.DataAnnotations;

namespace UniGames.Api.Models.DTOs
{
    public class CreateGameDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public int PlatformID { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime ReleaseDate { get; set; }
    }
}
