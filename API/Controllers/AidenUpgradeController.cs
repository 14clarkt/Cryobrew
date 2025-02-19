using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.AidenUpgrades;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AidenUpgradeController : BaseApiController
    {
        [HttpGet] //api/aidenupgrade
        public async Task<IActionResult> GetAUs()
        {
            return HandleResult(await Mediator.Send(new ListAidenUpgrade.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateMI(AidenUpgrade au)
        {
            return HandleResult(await Mediator.Send(new CreateAidenUpgrade.Command{AidenUpgrade = au}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMI(Guid id, AidenUpgrade au)
        {
            au.Id = id;
            return HandleResult(await Mediator.Send(new UpdateAidenUpgrade.Command{AidenUpgrade = au}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMI(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteAidenUpgrade.Command{Id = id}));
        }
    }
}