namespace Domain
{
    public class CrelicAbility
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<CrelicSubAbility> CrelicSubAbilities { get; set; } = new List<CrelicSubAbility>();
    }
}