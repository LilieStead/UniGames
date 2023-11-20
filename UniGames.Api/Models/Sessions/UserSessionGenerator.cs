using System.Security.Cryptography;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.Sessions
{
    public class UserSessionGenerator
    {

        private readonly JwtConfig jwtConfig;
        public UserSessionGenerator(JwtConfig jwtConfig)
        {
            this.jwtConfig = jwtConfig;
        }
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

        // Generates a random key and returns it as a base64-encoded string
        public static string GenerateRandomBase64Key()
        {
            const int keyLengthBytes = 32; // 256 bits
            byte[] keyBytes = GenerateRandomBytes(keyLengthBytes);
            return Convert.ToBase64String(keyBytes);
        }

        // Generates random bytes using RandomNumberGenerator
        private static byte[] GenerateRandomBytes(int length)
        {
            byte[] randomBytes = new byte[length];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }
            return randomBytes;
        }
        
        // Secret Key that verifies the JWT (JSON Web Token)
        public string GenerateJwtToken(string userId, string username)
        {
            // Creates a new instance of the class
            var handleToken = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Represents the user by the userID
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("sub", userId),
                    new Claim("username", username)
                }),
                // Set when the token will expire (in days)
                Expires = DateTime.UtcNow.AddDays(7),
                // Signs the cryptographic details of the token and defines the algorithm
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("kJzRYdJJUhdq4WgEy0b9776inofSohUC7uuNZkhwwE4=")), SecurityAlgorithms.HmacSha256Signature)
            };

            // Creates the token itself based on the TokenDescriptor
            var token = handleToken.CreateToken(tokenDescriptor);
            
            // Converts the token to a string representation
            return handleToken.WriteToken(token);
        }
        
    }
}
