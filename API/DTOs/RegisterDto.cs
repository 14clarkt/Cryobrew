using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$", ErrorMessage = "Password must have length between 8-32, contain at least 1 symbol. and contain at least 1 uppercase letter.")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}