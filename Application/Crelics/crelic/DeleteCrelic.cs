using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.Crelics
{
    public class DeleteCrelic
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
                var crelic = await _context.Crelics
                    .Include(a => a.CrelicAbilities)
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (crelic == null) return null;

                foreach (var ca in crelic.CrelicAbilities)
                {
                    _context.Remove(ca); //TODO: remove their lists as well
                }
                _context.Remove(crelic);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the crelic");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}