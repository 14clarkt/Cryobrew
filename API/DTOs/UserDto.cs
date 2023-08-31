namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public int CurrentAP { get; set; }
        public int MaxAP { get; set; }
        public int APCSlots { get; set; }
    }
}