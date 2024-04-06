using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Crelics
{
    public class DeleteCrelicAbility
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
                var crelicAbility = await _context.CrelicAbilities
                    .Include(a => a.CrelicSubAbilities)
                        .ThenInclude(b => b.CrelicSubAbilityLevels)
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (crelicAbility == null) return null;

                foreach (var csa in crelicAbility.CrelicSubAbilities)
                {
                    foreach (var csal in csa.CrelicSubAbilityLevels)
                    {
                        _context.Remove(csal);
                    }
                    _context.Remove(csa);
                }
                _context.Remove(crelicAbility);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the crelicAbility");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}