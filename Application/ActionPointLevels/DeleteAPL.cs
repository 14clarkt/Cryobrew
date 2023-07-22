using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.ActionPointLevels
{
    public class DeleteAPL
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid APCId { get; set; }
            public Guid APLId { get; set; }
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
                var apc = await _context.ActionPointCards
                    .Include(a => a.ActionPointLevels)
                    .Where(a => a.Id == request.APCId)
                    .SingleOrDefaultAsync();

                var apl = await _context.ActionPointLevels
                    .Where(a => a.Id == request.APLId)
                    .SingleOrDefaultAsync();

                if (apc == null || apl == null) return null;

                apc.ActionPointLevels.Remove(apl);
                _context.Remove(apl);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the apc");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}