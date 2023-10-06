using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.ActionPointCards
{
    public class DeleteAlchemyIngredient
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
                var ing = await _context.AlchemyIngredients
                    .Include(a => a.Potencies)
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (ing == null) return null;

                foreach (var potency in ing.Potencies)
                {
                    _context.Remove(potency);
                }
                _context.Remove(ing);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the ingredient");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}