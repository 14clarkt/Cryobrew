using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;


namespace Application.Rules
{
    public class DeleteRule
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
                var rule = await _context.Rules
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync();

                if (rule == null) return null;

                _context.Remove(rule);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the rule");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}