using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ActionPointCard> ActionPointCards { get; set; }
        public DbSet<ActionPointLevel> ActionPointLevels { get; set; }
        public DbSet<EquipmentQuality> EquipmentQualities { get; set; }
        public DbSet<AlchemyTrait> AlchemyTraits { get; set; }
        public DbSet<AlchemyPotencyRange> AlchemyPotencyRanges { get; set; }
    }
}