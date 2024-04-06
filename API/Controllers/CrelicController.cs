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

        [HttpPost("ability/{crelicId}")] 
        public async Task<IActionResult> CreateCrelicAbility([FromRoute] Guid crelicId, [FromBody] CrelicAbility crelicAbility)
        {
            return HandleResult(await Mediator.Send(new CreateCrelicAbility.Command{CrelicId = crelicId, CrelicAbility = crelicAbility}));
        }

        [HttpPut("ability/{id}")]
        public async Task<IActionResult> UpdateCrelicAbility(Guid id, CrelicAbility crelicAbility)
        {
            crelicAbility.Id = id;
            return HandleResult(await Mediator.Send(new UpdateCrelicAbility.Command{CrelicAbility = crelicAbility}));
        }

        [HttpDelete("ability/{id}")]
        public async Task<IActionResult> DeleteCrelicAbility(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCrelicAbility.Command{Id = id}));
        }

        // CrelicSubAbilities

        [HttpPost("subability/{crelicAbilityId}")] //api/crelic/subability
        public async Task<IActionResult> CreateCrelicSubAbility([FromRoute] Guid crelicAbilityId, [FromBody] CrelicSubAbility crelicSubAbility)
        {
            return HandleResult(await Mediator.Send(new CreateCrelicSubAbility.Command{CrelicAbilityId = crelicAbilityId, CrelicSubAbility = crelicSubAbility}));
        }

        [HttpPut("subability/{id}")]
        public async Task<IActionResult> UpdateCrelicSubAbility(Guid id, CrelicSubAbility crelicSubAbility)
        {
            crelicSubAbility.Id = id;
            return HandleResult(await Mediator.Send(new UpdateCrelicSubAbility.Command{CrelicSubAbility = crelicSubAbility}));
        }

        [HttpDelete("subability/{id}")]
        public async Task<IActionResult> DeleteCrelicSubAbility(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCrelicSubAbility.Command{Id = id}));
        }

        // CrelicSubAbilityLevels

        [HttpPost("subabilitylevel/{crelicSubAbilityId}")] //api/crelic/subabilitylevel
        public async Task<IActionResult> CreateCrelicSubAbilityLevel([FromRoute] Guid crelicSubAbilityId, [FromBody] CrelicSubAbilityLevel crelicSubAbilityLevel)
        {
            return HandleResult(await Mediator.Send(new CreateCrelicSubAbilityLevel.Command{CrelicSubAbilityId = crelicSubAbilityId, CrelicSubAbilityLevel = crelicSubAbilityLevel}));
        }

        [HttpPut("subabilitylevel/{id}")]
        public async Task<IActionResult> UpdateCrelicSubAbilityLevel(Guid id, CrelicSubAbilityLevel crelicSubAbilityLevel)
        {
            crelicSubAbilityLevel.Id = id;
            return HandleResult(await Mediator.Send(new UpdateCrelicSubAbilityLevel.Command{CrelicSubAbilityLevel = crelicSubAbilityLevel}));
        }

        [HttpDelete("subabilitylevel/{id}")]
        public async Task<IActionResult> DeleteCrelicSubAbilityLevel(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCrelicSubAbilityLevel.Command{Id = id}));
        }
    }
}