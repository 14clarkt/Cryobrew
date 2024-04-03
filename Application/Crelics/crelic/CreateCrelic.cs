using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Core;

namespace Application.Crelics
{
    public class CreateCrelic
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Crelic Crelic { get; set; }
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
                _context.Crelics.Add(request.Crelic);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create Crelic");
                
                return Result<Unit>.Success(Unit.Value); // Unit Just tells API this is done, no intrinsic value
            }
        }
    }
}