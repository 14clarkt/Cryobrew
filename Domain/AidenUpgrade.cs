namespace Domain
{
    public class AidenUpgrade
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Cost { get; set; }
        public int CurrentLevel { get; set; }
        public int MaxLevel { get; set; }
        public string? Player { get; set; }
    }
}