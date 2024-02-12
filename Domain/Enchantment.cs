using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Enchantment
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public string ApplicableEquipment { get; set; }
        public string Restrictions { get; set; }
        public string Range { get; set; }
        public string Duration { get; set; }
        public string SpecificCosts { get; set; }
        public int TotalPower { get; set; }
        public string EffectCost { get; set; }
        public string EffectAction { get; set; }
        public string Effect { get; set; }
        public bool Found { get; set; }
        public bool Learned { get; set; }
    }
}