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
            CreateMap<Domain.Supply, Domain.Supply>();
        }
    }
}