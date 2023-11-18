using System.Security.Cryptography;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
namespace UniGames.Api.Models.Sessions
{
    public class UserSessionGenerator
    {
        /*public static string GenerateSessionIdentifier()
        {
            // Creates a Byte array to store random data for the session identifier
            byte[] sessionIDBytes = new byte[64];

            // Uses the RandomNumberGenerator method te generate a random number
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                // Fill the byte array with random data
                rng.GetBytes(sessionIDBytes);
            }

            // Convert the byte array to a string representation
            string sessionID = BitConverter.ToString(sessionIDBytes).Replace("-", "").ToLower();

            return sessionID;
        }*/

        // Secret Key that verifies the JWT (JSON Web Token)
        private static readonly string SecretKey = "7FjkL0tRiZDNf8aQz6e1b2XJmOygHqKvItPp3sVhUc4WnAd5xYrEgSdCfBvNlM";
        public static string GenerateJwtToken(string userId)
        {
            // Creates a new instance of the class
            var handleToken = new JwtSecurityTokenHandler();
            // Encodes the secret key
            var key = Encoding.ASCII.GetBytes(SecretKey);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Represents the user by the userID
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userId),
                }),
                // Set when the token will expire (in days)
                Expires = DateTime.UtcNow.AddDays(7),
                // Signs the cryptographic details of the token and defines the algorithm
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            // Creates the token itself based on the TokenDescriptor
            var token = handleToken.CreateToken(tokenDescriptor);
            // Converts the token to a string representation
            return handleToken.WriteToken(token);
        }
        
    }
}
