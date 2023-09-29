using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ActionPointCards;
using Application.Alchemy;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AlchemyController : BaseApiController
    {
        [HttpGet("trait")] //api/alchemy/trait
        public async Task<IActionResult> GetAlchemyTraits()
        {
            return HandleResult(await Mediator.Send(new ListAlchemyTrait.Query()));
        }

        [HttpPost("trait")]
        public async Task<IActionResult> CreateAlchemyTrait(AlchemyTrait trait)
        {
            return HandleResult(await Mediator.Send(new CreateAlchemyTrait.Command{AlchemyTrait = trait}));
        }

        [HttpDelete("trait/{id}")]
        public async Task<IActionResult> DeleteAlchemyTrait(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteAlchemyTrait.Command{Id = id}));
        }

        [HttpPost("potencyrange/{id}")] 
        public async Task<IActionResult> CreateAlchemyPotencyRange(AlchemyPotencyRange apr, Guid id)
        {
            return HandleResult(await Mediator.Send(new CreateAPR.Command{AlchemyPotencyRange = apr, ATId = id}));
        }

        [HttpPut("potencyrange/{id}")]
        public async Task<IActionResult> EditAlchemyPotencyRange(AlchemyPotencyRange apr)
        {
            return HandleResult(await Mediator.Send(new UpdateAPR.Command{AlchemyPotencyRange = apr}));
        }

        [HttpDelete("potencyrange/{atid}/{aprid}")]
        public async Task<IActionResult> DeleteAlchemyPotencyRange(Guid atid, Guid aprid)
        {
            return HandleResult(await Mediator.Send(new DeleteAPR.Command{ATId = atid, APRId = aprid}));
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateActionPointCard(Guid id, ActionPointCard apc)
        // {
        //     apc.Id = id;
        //     return HandleResult(await Mediator.Send(new UpdateAPC.Command{ActionPointCard = apc}));
        // }
    }
}