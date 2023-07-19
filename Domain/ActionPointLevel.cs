namespace Domain
{
    public class ActionPointLevel
    {
        public Guid Id { get; set; }
        public int Level { get; set; }
        public string Range { get; set; }
        public string Cost { get; set; }
        public string Duration { get; set; }
        public string Prerequisite { get; set; }
        public string UpgradeCost { get; set; }
        public string CastingTime { get; set; }
        public string Description { get; set; }
    }
}