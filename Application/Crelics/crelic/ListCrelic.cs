using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Crelics
{
    public class ListCrelic
    {
        public class Query : IRequest<Result<List<Crelic>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Crelic>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Crelic>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var crelics = await _context.Crelics
                    .Include(a => a.CrelicAbilities)
                        .ThenInclude(b => b.CrelicSubAbilities)
                            .ThenInclude(d => d.CrelicSubAbilityLevels)
                    .ToListAsync();

                return Result<List<Crelic>>.Success(crelics);
            }
        }
    }
}