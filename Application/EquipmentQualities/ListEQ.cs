using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.EquipmentQualities
{
    public class ListEQ
    {
        public class Query : IRequest<Result<List<EquipmentQuality>>> { }

        public class Handler : IRequestHandler<Query, Result<List<EquipmentQuality>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<EquipmentQuality>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var eqs = await _context.EquipmentQualities.ToListAsync();

                return Result<List<EquipmentQuality>>.Success(eqs);
            }
        }
    }
}