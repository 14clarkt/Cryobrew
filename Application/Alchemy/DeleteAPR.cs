using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.Alchemy
{
    public class DeleteAPR
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ATId { get; set; }
            public Guid APRId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {   
                var at = await _context.AlchemyTraits
                    .Include(a => a.PotencyRanges)
                    .Where(a => a.Id == request.ATId)
                    .SingleOrDefaultAsync();

                var apr = await _context.AlchemyPotencyRanges
                    .Where(a => a.Id == request.APRId)
                    .SingleOrDefaultAsync();

                if (at == null || apr == null) return null;

                at.PotencyRanges.Remove(apr);
                _context.Remove(apr);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the apr");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}