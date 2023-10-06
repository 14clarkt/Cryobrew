using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.Alchemy
{
    public class DeleteAIP
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid AIid { get; set; }
            public Guid AIPId { get; set; }
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
                var ing = await _context.AlchemyIngredients
                    .Include(a => a.Potencies)
                    .Where(a => a.Id == request.AIid)
                    .SingleOrDefaultAsync();

                var aip = await _context.AlchemyIngredientPotencies
                    .Where(a => a.Id == request.AIPId)
                    .SingleOrDefaultAsync();

                if (ing == null || aip == null) return null;

                ing.Potencies.Remove(aip);
                _context.Remove(aip);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the aip");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}