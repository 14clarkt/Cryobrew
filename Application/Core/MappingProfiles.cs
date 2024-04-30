using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ActionPointCard, ActionPointCard>();
            CreateMap<ActionPointLevel, ActionPointLevel>();
            CreateMap<EquipmentQuality, EquipmentQuality>();
            CreateMap<AlchemyPotencyRange, AlchemyPotencyRange>();
            CreateMap<AlchemyTrait, AlchemyTrait>();
            CreateMap<AlchemyIngredient, AlchemyIngredient>();
            CreateMap<AlchemyIngredientPotency, AlchemyIngredientPotency>();
            CreateMap<AlchemyProduct, AlchemyProduct>();
            CreateMap<Domain.Rule, Domain.Rule>();
            CreateMap<Domain.Supply, Domain.Supply>();
            CreateMap<Enchantment, Enchantment>();
            CreateMap<Crelic, Crelic>();
            CreateMap<CrelicAbility, CrelicAbility>();
            CreateMap<CrelicSubAbility, CrelicSubAbility>();
            CreateMap<CrelicSubAbilityLevel, CrelicSubAbilityLevel>();
            CreateMap<MagicItem, MagicItem>();
        }
    }
}