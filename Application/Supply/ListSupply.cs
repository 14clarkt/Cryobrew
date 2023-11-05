using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Supply
{
    public class ListSupply
    {
        public class Query : IRequest<Result<List<Domain.Supply>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Domain.Supply>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Domain.Supply>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var supplies = await _context.Supplies.ToListAsync();

                return Result<List<Domain.Supply>>.Success(supplies);
            }
        }
    }
}