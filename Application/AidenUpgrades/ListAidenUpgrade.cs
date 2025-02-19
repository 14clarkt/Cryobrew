using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.AidenUpgrades
{
    public class ListAidenUpgrade
    {
        public class Query : IRequest<Result<List<AidenUpgrade>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AidenUpgrade>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<AidenUpgrade>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var aidenUpgrades = await _context.AidenUpgrades.ToListAsync();

                return Result<List<AidenUpgrade>>.Success(aidenUpgrades);
            }
        }
    }
}