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
        private readonly JwtConfig _jwtConfig;

        public JwtService(JwtConfig _jwtConfig)
        {
            this._jwtConfig = _jwtConfig;
        }

        public (string UserId, string UserName) DecodeJwtAndGetUserId(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecretKey)),
                ValidateIssuer = true,
                ValidIssuer = "UniGames",
                ValidateAudience = false,
            };

            try
            {
                var claimsPrinciple = tokenHandler.ValidateToken(jwtToken, validationParameters, out SecurityToken validatedToken);

                var userIdClaim = (validatedToken as JwtSecurityToken)?.Claims?.FirstOrDefault(claim => claim.Type == "sub");
                var userNameClaim = (validatedToken as JwtSecurityToken)?.Claims?.FirstOrDefault(claim => claim.Type == "username");
                if (userIdClaim != null && userNameClaim != null)
                {
                    return (userIdClaim.Value, userNameClaim.Value);
                }
                
                return (null, null);
            }
            catch (SecurityTokenValidationException ex)
            {
                Console.WriteLine("Token failure: " + ex.Message);
                return(null, null);
            }

        }
    }
}
