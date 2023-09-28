namespace Domain
{
    public class AlchemyPotencyRange
    {
        public Guid Id { get; set; }
        public string Range { get; set; }
        public string Duration { get; set; }
        public string Effect { get; set; }
        public int Order { get; set; } = 0;
    }
}