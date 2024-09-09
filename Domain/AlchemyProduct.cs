namespace Domain
{
    public class AlchemyProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; } = 1;
    }
}