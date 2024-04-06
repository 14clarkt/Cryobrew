using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.Crelics
{
    public class UpdateCrelicAbility
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CrelicAbility CrelicAbility { get; set; }
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
                var crelicAbility = await _context.CrelicAbilities.FindAsync(request.CrelicAbility.Id);

                if (crelicAbility == null) return null;

                _mapper.Map(request.CrelicAbility, crelicAbility);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update crelicAbility");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}