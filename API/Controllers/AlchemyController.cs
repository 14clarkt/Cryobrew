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

        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateActionPointCard(Guid id, ActionPointCard apc)
        // {
        //     apc.Id = id;
        //     return HandleResult(await Mediator.Send(new UpdateAPC.Command{ActionPointCard = apc}));
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteAPC(Guid id)
        // {
        //     return HandleResult(await Mediator.Send(new DeleteAPC.Command{Id = id}));
        // }
    }
}