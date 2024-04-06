using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Core;
using Microsoft.EntityFrameworkCore.Update;
using System.Runtime.InteropServices;

namespace Application.Crelics
{
    public class CreateCrelicSubAbilityLevel
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid CrelicSubAbilityId { get; set; }
            public CrelicSubAbilityLevel CrelicSubAbilityLevel { get; set; }
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
                var crelicSubAbilityLevel = _context.CrelicSubAbilityLevels.Add(request.CrelicSubAbilityLevel);

                var crelicSubAbility = await _context.CrelicSubAbilities.FindAsync(request.CrelicSubAbilityId);
                crelicSubAbility.CrelicSubAbilityLevels.Add(crelicSubAbilityLevel.Entity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create CrelicSubAbilityLevel");
                
                return Result<Unit>.Success(Unit.Value); // Unit Just tells API this is done, no intrinsic value
            }
        }
    }
}