using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.ActionPointCards
{
    public class ListAlchemyIngredients
    {
        public class Query : IRequest<Result<List<AlchemyIngredient>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AlchemyIngredient>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<AlchemyIngredient>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var alchIngs = await _context.AlchemyIngredients
                    .Include(a => a.Potencies)
                    .ToListAsync();

                return Result<List<AlchemyIngredient>>.Success(alchIngs);
            }
        }
    }
}