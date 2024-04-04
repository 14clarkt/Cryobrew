using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Crelics;

namespace API.Controllers
{
    [AllowAnonymous]
    public class CrelicController : BaseApiController
    {
        [HttpGet] //api/crelic
        public async Task<IActionResult> GetCrelics()
        {
            return HandleResult(await Mediator.Send(new ListCrelic.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateCrelic(Crelic crelic)
        {
            return HandleResult(await Mediator.Send(new CreateCrelic.Command{Crelic = crelic}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCrelic(Guid id, Crelic crelic)
        {
            crelic.Id = id;
            return HandleResult(await Mediator.Send(new UpdateCrelic.Command{Crelic = crelic}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrelic(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCrelic.Command{Id = id}));
        }

        // CrelicAbilities

        [HttpGet("ability")] //api/crelic/ability
        public async Task<IActionResult> GetCrelicAbilites()
        {
            return HandleResult(await Mediator.Send(new ListCrelicAbility.Query()));
        }

        [HttpPost("ability/{crelicId}")] 
        public async Task<IActionResult> CreateCrelicAbility([FromRoute] Guid crelicId, [FromBody] CrelicAbility crelicAbility)
        {
            return HandleResult(await Mediator.Send(new CreateCrelicAbility.Command{CrelicId = crelicId, CrelicAbility = crelicAbility}));
        }

        // CrelicSubAbilities

        [HttpPost("subability/{crelicAbilityId}")] //api/crelic/subability
        public async Task<IActionResult> CreateCrelicSubAbility([FromRoute] Guid crelicAbilityId, [FromBody] CrelicSubAbility crelicSubAbility)
        {
            return HandleResult(await Mediator.Send(new CreateCrelicSubAbility.Command{CrelicAbilityId = crelicAbilityId, CrelicSubAbility = crelicSubAbility}));
        }

        // CrelicSubAbilityLevels
        [HttpPost("subabilitylevel/{crelicSubAbilityId}")] //api/crelic/subabilitylevel
        public async Task<IActionResult> CreateCrelicSubAbilityLevel([FromRoute] Guid crelicSubAbilityId, [FromBody] CrelicSubAbilityLevel crelicSubAbilityLevel)
        {
            return HandleResult(await Mediator.Send(new CreateCrelicSubAbilityLevel.Command{CrelicSubAbilityId = crelicSubAbilityId, CrelicSubAbilityLevel = crelicSubAbilityLevel}));
        }
    }
}