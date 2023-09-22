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
        }
    }
}