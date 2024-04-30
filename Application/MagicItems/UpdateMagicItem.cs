using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.MagicItems
{
    public class UpdateMagicItem
    {
        public class Command : IRequest<Result<Unit>>
        {
            public MagicItem MagicItem { get; set; }
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
                var magicItem = await _context.MagicItems.FindAsync(request.MagicItem.Id);

                if (magicItem == null) return null;

                _mapper.Map(request.MagicItem, magicItem);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update magicItem");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}