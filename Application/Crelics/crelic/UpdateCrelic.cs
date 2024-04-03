using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.Crelics
{
    public class UpdateCrelic
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var apc = await _context.Crelics.FindAsync(request.Crelic.Id);

                if (apc == null) return null;

                _mapper.Map(request.Crelic, apc);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Crelic");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}