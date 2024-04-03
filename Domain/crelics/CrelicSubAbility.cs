namespace Domain
{
    public class CrelicSubAbility
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public ICollection<CrelicSubAbilityLevel> CrelicSubAbilityLevels { get; set; } = new List<CrelicSubAbilityLevel>();
    }
}