using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.Sessions
{
    public class JwtService
    {
        private static readonly RandomNumberGenerator randomNumber = RandomNumberGenerator.Create();
        private readonly JwtConfig _jwtConfig;

        public JwtService(JwtConfig _jwtConfig)
        {
            this._jwtConfig = _jwtConfig;
        }

        public string GenerateRandomBase64Key(int length)
        {
            byte[] keyBytes = new byte[length];
            randomNumber.GetBytes(keyBytes);
            return Convert.ToBase64String(keyBytes);
        }
        public (string UserId, string UserName) DecodeJwtAndGetUserId(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("kJzRYdJJUhdq4WgEy0b9776inofSohUC7uuNZkhwwE4=")),
                ValidateIssuer = false,
                ValidateAudience = false,
            };

            try
            {;
                
                var claimsPrinciple = tokenHandler.ValidateToken(jwtToken, validationParameters, out SecurityToken validatedToken);

                //var userIdClaim = claimsPrinciple.FindFirst("sub");

                var userIdClaim = (validatedToken as JwtSecurityToken)?.Claims?.FirstOrDefault(claim => claim.Type == "sub");
                var userNameClaim = (validatedToken as JwtSecurityToken)?.Claims?.FirstOrDefault(claim => claim.Type == "username");
                //var userIdClaim = (claimsPrinciple?.Claims?.FirstOrDefault(claims => claims.Type == "sub"));
                if (userIdClaim != null && userNameClaim != null)
                {
                    return (userIdClaim.Value, userNameClaim.Value);
                }
                
                return (null, null);
            }
            catch (SecurityTokenValidationException ex)
            {
                Console.WriteLine("Token failure: " + ex.Message);
                Console.WriteLine($"Token validation failure: {ex.Message}");

                // Optionally, log the entire exception to get more details
                Console.WriteLine($"Exception details: {ex}");
                return(null, null);
            }

        }
    }
}
