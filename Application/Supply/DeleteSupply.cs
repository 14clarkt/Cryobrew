using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.Supply
{
    public class DeleteSupply
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
                var supply = await _context.Supplies
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (supply == null) return null;

                _context.Remove(supply);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the supply");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}