using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public int CurrentAP { get; set; }
        public int MaxAP { get; set; }
        public int ShortAP { get; set; } = 0;
        public int APCSlots { get; set; }
    }
}