namespace UniGames.Api.Models.DTOs
{
    public class CreateUsersDTO
    {
        public int UserId { get; set; }
        public string Userfname { get; set; }
        public string Userlname { get; set; }
        public string Useremail { get; set; }
        public string Userphone { get; set; }
        public string Userpassword { get; set; }
        public DateTime Userdob { get; set; }
        public string Username { get; set; }
    }
}
