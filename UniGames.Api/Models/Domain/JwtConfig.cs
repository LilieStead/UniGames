using UniGames.Api.Models.Sessions;

namespace UniGames.Api.Models.Domain
{
    public class JwtConfig
    {

        private static readonly Lazy<string> LazySecretKey = new Lazy<string>(GenerateRandomBase64Key);

        public string SecretKey => LazySecretKey.Value;
        private static string GenerateRandomBase64Key()
        {
            // You can customize the logic for generating the key as needed
            return UserSessionGenerator.GenerateRandomBase64Key();
        }





        //private static readonly Lazy<string> LazySecretKey = new Lazy<string>(GenerateRandomBase64Key);
        /*private static readonly Lazy<JwtConfig> LazyInstance = new Lazy<JwtConfig>(() => new JwtConfig());
        private readonly object _lockObject = new object();

        public JwtConfig()
        {
            CurrentSecretKey = UserSessionGenerator.GenerateRandomBase64Key();
            //LastRotationTime = DateTime.UtcNow;
        }
        public static JwtConfig Instance => LazyInstance.Value;

        //public string SecretKey => LazySecretKey.Value;
        public string SecretKey
        {
            get
            {
                return CurrentSecretKey;
            }
        }

        private string CurrentSecretKey { get; set; }*/
        // Could be used to check rotation time but time it takes to do is too long
        // private DateTime LastRotationTime { get; set; }

        // This code is not necessarily relevant as I wanted to complete this but the complexity and time taken is not
        // a valid excuse at this moment in time and will degrade the quality of other functions

        /*public bool NeedsKeyRotation() 
        {
            return DateTime.UtcNow - LastRotationTime >= TimeSpan.FromDays(7);
        }

        public void RotateKey()
        {
            lock (_lockObject)
            {
                // If CurrentSecretKey is null or empty, generate a new key
                if (string.IsNullOrEmpty(CurrentSecretKey) || NeedsKeyRotation())
                {
                    CurrentSecretKey = UserSessionGenerator.GenerateRandomBase64Key();
                }

            }
        }*/

    }
}
