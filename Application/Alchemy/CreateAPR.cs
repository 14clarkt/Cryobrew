using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Core;

namespace Application.Alchemy
{
    public class CreateAPR
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AlchemyPotencyRange AlchemyPotencyRange { get; set; }
            public Guid ATId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
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
                var apr = _context.AlchemyPotencyRanges.Add(request.AlchemyPotencyRange);
                
                var at = await _context.AlchemyTraits.FindAsync(request.ATId);
                at.PotencyRanges.Add(apr.Entity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create APR");
                
                return Result<Unit>.Success(Unit.Value); // Unit Just tells API this is done, no intrinsic value
            }
        }
    }
}