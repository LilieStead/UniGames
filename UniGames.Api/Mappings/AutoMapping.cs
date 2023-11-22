using AutoMapper;
using UniGames.Api.Controllers;
using UniGames.Api.Data;
using UniGames.Api.Models.Domain;
using UniGames.Api.Models.DTOs;



namespace UniGames.Api.Mappings
{
    // Uses the built-in AutoMapper Profile to create a new Profile
    public class AutoMapperProfile: Profile 
    {
        public AutoMapperProfile()
        {
            // This is how to create a map
            CreateMap<Game, GameDTO>().ReverseMap();
            CreateMap<Platform, PlatformDTO>().ReverseMap();
            CreateMap<GameDetail, GameDetailDTO>().ReverseMap();
            CreateMap<Review, ReviewDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            // Other maps go here
            CreateMap<Review, CreateReviewDTO>().ReverseMap();
            CreateMap<User, CreateUsersDTO>().ReverseMap();
            CreateMap<Game, CreateGameDTO>().ReverseMap();
            CreateMap<User, UpdatePasswordDTO>().ReverseMap();
            CreateMap<Game, UpdateGameDTO>().ReverseMap();
            CreateMap<GameDetail,  CreateGameDetailDTO>().ReverseMap();
            CreateMap<GameDetail,  UpdateGameDetailDTO>().ReverseMap();

            // Created by Kieron -- Original team member did not finish
            CreateMap<Review, UpdateReviewDTO>().ReverseMap();
        }
    }
}
