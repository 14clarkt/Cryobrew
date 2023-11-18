using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.ActionPointCards
{
    public class ListAlchemyProduct
    {
        public class Query : IRequest<Result<List<AlchemyProduct>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AlchemyProduct>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<AlchemyProduct>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await _context.AlchemyProducts
                    .ToListAsync();

                return Result<List<AlchemyProduct>>.Success(products);
            }
        }
    }
}