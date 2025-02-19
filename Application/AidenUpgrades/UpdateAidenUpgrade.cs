using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.AidenUpgrades
{
    public class UpdateAidenUpgrade
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AidenUpgrade AidenUpgrade { get; set; }
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var aidenUpgrade = await _context.AidenUpgrades.FindAsync(request.AidenUpgrade.Id);

                if (aidenUpgrade == null) return null;

                _mapper.Map(request.AidenUpgrade, aidenUpgrade);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update aidenUpgrade");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}