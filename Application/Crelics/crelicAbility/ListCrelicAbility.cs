using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Crelics
{
    public class ListCrelicAbility
    {
        public class Query : IRequest<Result<List<CrelicAbility>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CrelicAbility>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<CrelicAbility>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var crelicAbilities = await _context.CrelicAbilities
                    .Include(a => a.CrelicSubAbilities)
                    .ToListAsync();

                return Result<List<CrelicAbility>>.Success(crelicAbilities);
            }
        }
    }
}