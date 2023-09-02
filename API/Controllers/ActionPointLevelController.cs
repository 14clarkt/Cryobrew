using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.ActionPointLevels;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActionPointLevelController : BaseApiController
    {
        // [HttpGet] //api/actionpointcard
        // public async Task<IActionResult> GetActivities()
        // {
        //     return HandleResult(await Mediator.Send(new List.Query()));
        // }

        // [HttpGet("{id}")] //api/actionpointcard/{Guid}
        // public async Task<IActionResult> GetActivity(Guid id)
        // {
        //     return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        // }

        [HttpPost("{id}")] 
        public async Task<IActionResult> CreateActionPointLevel(ActionPointLevel apl, Guid id)
        {
            return HandleResult(await Mediator.Send(new CreateAPL.Command{ActionPointLevel = apl, APCId = id}));
        }

        [HttpDelete("{apcid}/{aplid}")]
        public async Task<IActionResult> DeleteAPL(Guid apcid, Guid aplid)
        {
            return HandleResult(await Mediator.Send(new DeleteAPL.Command{APCId = apcid, APLId = aplid}));
        }

        [HttpPost("{apcid}/{aplid}/{copyAplId}")]
        public async Task<IActionResult> CopyApl(Guid apcid, Guid aplid, Guid copyAplId)
        {
            return HandleResult(await Mediator.Send(new CopyAPL.Command{APCid = apcid, APLid = aplid, CopyAplId = copyAplId}));
        }

        [HttpPut]
        public async Task<IActionResult> EditActionPointLevel(ActionPointLevel apl)
        {
            return HandleResult(await Mediator.Send(new UpdateAPL.Command{ActionPointLevel = apl}));
        }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteActivity(Guid id)
        // {
        //     return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        // }
    }
}