using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Activities
{
    public class ListAPC
    {
        public class Query : IRequest<Result<List<ActionPointCard>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActionPointCard>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<ActionPointCard>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var apcs = await _context.ActionPointCards
                    .Include(a => a.ActionPointLevels)
                    .ToListAsync();

                return Result<List<ActionPointCard>>.Success(apcs);
            }
        }
    }
}