using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.ActionPointCards
{
    public class ListAlchemyTrait
    {
        public class Query : IRequest<Result<List<AlchemyTrait>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AlchemyTrait>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<AlchemyTrait>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var alchemyTraits = await _context.AlchemyTraits
                    .Include(a => a.PotencyRanges)
                    .ToListAsync();

                return Result<List<AlchemyTrait>>.Success(alchemyTraits);
            }
        }
    }
}