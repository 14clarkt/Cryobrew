using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.EquipmentQualities
{
    public class DeleteEQ
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
                var eq = await _context.EquipmentQualities
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (eq == null) return null;

                _context.Remove(eq);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the eq");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}