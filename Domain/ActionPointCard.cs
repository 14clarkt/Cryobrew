namespace Domain
{
    public class ActionPointCard
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<ActionPointLevel> ActionPointLevels { get; set; } = new List<ActionPointLevel>();
    }
}