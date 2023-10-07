namespace Domain
{
    public class AlchemyIngredient
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string BiomesCreatures { get; set; }
        public string Types { get; set; }
        public int Quantity { get; set; }
        public int PerUse { get; set; }
        public bool Hidden { get; set; }
        public ICollection<AlchemyIngredientPotency> Potencies { get; set; } = new List<AlchemyIngredientPotency>();
    }
}