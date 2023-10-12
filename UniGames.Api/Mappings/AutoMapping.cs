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
            // Other maps go here
            
        }
    }
}
