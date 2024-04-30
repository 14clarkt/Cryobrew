using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.MagicItems;

namespace API.Controllers
{
    [AllowAnonymous]
    public class MagicItemController : BaseApiController
    {
        [HttpGet] //api/magicitem
        public async Task<IActionResult> GetMIs()
        {
            return HandleResult(await Mediator.Send(new ListMagicItem.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateMI(MagicItem mi)
        {
            return HandleResult(await Mediator.Send(new CreateMagicItem.Command{MagicItem = mi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMI(Guid id, MagicItem mi)
        {
            mi.Id = id;
            return HandleResult(await Mediator.Send(new UpdateMagicItem.Command{MagicItem = mi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMI(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteMagicItem.Command{Id = id}));
        }
    }
}