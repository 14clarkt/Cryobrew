using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class EquipmentQuality
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public string Tools { get; set; }
        public string Equipment { get; set; }
        public string Restrictions { get; set; }
        public string Cost { get; set; }
        public string Effect { get; set; }
        public string EffectCost { get; set; }
        public string EffectAction { get; set; }
        public bool Found { get; set; }
        public bool Learned { get; set; }
    }
}