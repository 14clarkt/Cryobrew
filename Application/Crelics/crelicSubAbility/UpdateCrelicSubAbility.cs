using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.Crelics
{
    public class UpdateCrelicSubAbility
    {
        public class Command : IRequest<Result<Unit>>
        {
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var crelicSubAbility = await _context.CrelicSubAbilities.FindAsync(request.CrelicSubAbility.Id);

                if (crelicSubAbility == null) return null;

                _mapper.Map(request.CrelicSubAbility, crelicSubAbility);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update crelicSubAbility");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}