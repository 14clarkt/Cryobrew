using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.ActionPointCards
{
    public class DeleteAPC
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
                var apc = await _context.ActionPointCards
                    .Include(a => a.ActionPointLevels)
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (apc == null) return null;

                foreach (var apl in apc.ActionPointLevels)
                {
                    _context.Remove(apl);
                }
                _context.Remove(apc);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the apc");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}