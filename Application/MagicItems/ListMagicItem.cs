using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.MagicItems
{
    public class ListMagicItem
    {
        public class Query : IRequest<Result<List<MagicItem>>> { }

        public class Handler : IRequestHandler<Query, Result<List<MagicItem>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<MagicItem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var magicItems = await _context.MagicItems.ToListAsync();

                return Result<List<MagicItem>>.Success(magicItems);
            }
        }
    }
}