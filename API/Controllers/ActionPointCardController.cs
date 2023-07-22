using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Activities;
using Application.ActionPointCards;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActionPointCardController : BaseApiController
    {
        [HttpGet] //api/actionpointcard
        public async Task<IActionResult> GetAPCs()
        {
            return HandleResult(await Mediator.Send(new ListAPC.Query()));
        }

        // [HttpGet("{id}")] //api/actionpointcard/{Guid}
        // public async Task<IActionResult> GetActivity(Guid id)
        // {
        //     return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        // }

        [HttpPost] 
        public async Task<IActionResult> CreateAPC(ActionPointCard apc)
        {
            return HandleResult(await Mediator.Send(new CreateAPC.Command{ActionPointCard = apc}));
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        // {
        //     activity.Id = id;
        //     return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAPC(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteAPC.Command{Id = id}));
        }
    }
}