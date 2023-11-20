using UniGames.Api.Models.Sessions;

namespace UniGames.Api.Models.Domain
{
    public class JwtConfig
    {
        public string SecretKey { get; set; } = "kJzRYdJJUhdq4WgEy0b9776inofSohUC7uuNZkhwwE4=";

        /*public JwtConfig() 
        {
            SecretKey = string.IsNullOrEmpty(SecretKey)
                ? UserSessionGenerator.GenerateRandomBase64Key()
                : SecretKey;
        }*/
    }
}
