using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Crelics
{
    public class DeleteCrelicSubAbility
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
                var crelicSubAbility = await _context.CrelicSubAbilities
                    .Include(a => a.CrelicSubAbilityLevels)
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (crelicSubAbility == null) return null;

                foreach (var csal in crelicSubAbility.CrelicSubAbilityLevels)
                {
                    _context.Remove(csal);
                }
                _context.Remove(crelicSubAbility);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the crelicSubAbility");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}