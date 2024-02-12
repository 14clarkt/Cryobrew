using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Enchanting
{
    public class ListEnch
    {
        public class Query : IRequest<Result<List<Enchantment>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Enchantment>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Enchantment>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var enchs = await _context.Enchantments.ToListAsync();

                return Result<List<Enchantment>>.Success(enchs);
            }
        }
    }
}