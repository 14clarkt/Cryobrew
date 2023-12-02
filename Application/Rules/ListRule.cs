using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Rules
{
    public class ListRule
    {
        public class Query : IRequest<Result<List<Domain.Rule>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Domain.Rule>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Domain.Rule>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rules = await _context.Rules.ToListAsync();

                return Result<List<Domain.Rule>>.Success(rules);
            }
        }
    }
}