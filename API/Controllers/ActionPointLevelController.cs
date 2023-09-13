using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ActionPointLevels;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActionPointLevelController : BaseApiController
    {
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
    }
}