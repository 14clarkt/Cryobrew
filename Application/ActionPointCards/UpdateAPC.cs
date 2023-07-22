using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.ActionPointCards
{
    public class UpdateAPC
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ActionPointCard ActionPointCard { get; set; }
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
                var apc = await _context.ActionPointCards.FindAsync(request.ActionPointCard.Id);

                if (apc == null) return null;

                apc.Name = request.ActionPointCard.Name;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update apc");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}