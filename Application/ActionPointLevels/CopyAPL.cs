using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.ActionPointLevels
{
    public class CopyAPL
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid APCid { get; set; }
            public Guid APLid { get; set; }
            public Guid CopyAplId { get; set; }
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
                var apl = await _context.ActionPointLevels.FindAsync(request.APLid);
                var apc = await _context.ActionPointCards.FindAsync(request.APCid);
                
                if (apl == null || apc == null) return null;

                var copyAPL = new ActionPointLevel{
                    Id = request.CopyAplId,
                    Range = apl.Range,
                    CastingTime = apl.CastingTime,
                    Cost = apl.Cost,
                    Description = apl.Description,
                    Duration = apl.Duration,
                    UpgradeCost = apl.UpgradeCost,
                    Prerequisite = apl.Prerequisite,
                    Level = apl.Level
                };

                var newApl = _context.ActionPointLevels.Add(copyAPL);
                apc.ActionPointLevels.Add(newApl.Entity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to copy apl");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}