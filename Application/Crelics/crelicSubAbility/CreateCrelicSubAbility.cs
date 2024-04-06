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
    public class CreateCrelicSubAbility
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid CrelicAbilityId { get; set; }
            public CrelicSubAbility CrelicSubAbility { get; set; }
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
                var crelicSubAbility = _context.CrelicSubAbilities.Add(request.CrelicSubAbility);

                var crelicAbility = await _context.CrelicAbilities.FindAsync(request.CrelicAbilityId);
                crelicAbility.CrelicSubAbilities.Add(crelicSubAbility.Entity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create CrelicSubAbility");
                
                return Result<Unit>.Success(Unit.Value); // Unit Just tells API this is done, no intrinsic value
            }
        }
    }
}