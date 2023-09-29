using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.ActionPointCards
{
    public class DeleteAlchemyTrait
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (at == null) return null;

                foreach (var apr in at.PotencyRanges)
                {
                    _context.Remove(apr);
                }
                _context.Remove(at);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the trait");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}