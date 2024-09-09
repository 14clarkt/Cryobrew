namespace Domain
{
    public class MagicItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Charges { get; set; }
        public int MaxCharges { get; set; }
        public int Count { get; set; }
        public bool IsHidden { get; set; }
        public string? EquippedBy { get; set; }
    }
}