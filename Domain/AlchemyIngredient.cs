namespace Domain
{
    public class AlchemyIngredient
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string BiomesCreatures { get; set; }
        public string Types { get; set; }
        public int quantity { get; set; }
        public bool hidden { get; set; }
        public ICollection<AlchemyIngredientPotency> Potencies { get; set; } = new List<AlchemyIngredientPotency>();
    }
}