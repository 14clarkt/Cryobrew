using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Core;

namespace Application.ActionPointLevels
{
    public class CreateAPL
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ActionPointLevel ActionPointLevel { get; set; }
            public Guid APCId { get; set; }
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
                var apl = _context.ActionPointLevels.Add(request.ActionPointLevel);
                
                var apc = await _context.ActionPointCards.FindAsync(request.APCId);
                apc.ActionPointLevels.Add(apl.Entity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create APL");
                
                return Result<Unit>.Success(Unit.Value); // Unit Just tells API this is done, no intrinsic value
            }
        }
    }
}