using UniGames.Api.Models.Domain;

namespace UniGames.Api.Models.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Userfname { get; set; }
        public string Userlname { get; set; }
        public string Useremail { get; set; }
        public char? Userphone { get; set; }
        public string Userpassword { get; set; }
        public DateTime Userdob {  get; set; }
        public string Username { get; set; }
    }
}
