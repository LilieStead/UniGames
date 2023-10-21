using AutoMapper;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;



namespace UniGames.Api.Mappings
{
    public class AutoMapperProfile: Profile 
    {
        public AutoMapperProfile()
        {
            // This is how to create a map
            CreateMap<Game, GameDTO>().ReverseMap();
            CreateMap<Platform, PlatformDTO>().ReverseMap();
            // Other maps go here
            CreateMap<Review,  ReviewDTO>().ReverseMap();
            CreateMap<Review, CreateReviewDTO>().ReverseMap();
            CreateMap<User,  UserDTO>().ReverseMap();
        }
    }
}
