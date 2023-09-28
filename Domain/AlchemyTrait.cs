namespace Domain
{
    public class AlchemyTrait
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Triggers { get; set; }
        public string Types { get; set; }
        public string Tier { get; set; }
        public bool Hidden { get; set; } = true;
        public ICollection<AlchemyPotencyRange> PotencyRanges { get; set; } = new List<AlchemyPotencyRange>();
    }
}