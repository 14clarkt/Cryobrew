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

        // [HttpPut("{id}")]
        // public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        // {
        //     activity.Id = id;
        //     return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteActivity(Guid id)
        // {
        //     return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        // }
    }
}