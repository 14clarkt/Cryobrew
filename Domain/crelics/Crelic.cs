namespace Domain
{
    public class Crelic
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Charges { get; set; } = 10;
        public int MaxCharges { get; set; } = 10;
        public bool isHidden { get; set; } = true;
        public ICollection<CrelicAbility> CrelicAbilities { get; set; } = new List<CrelicAbility>();
    }
}