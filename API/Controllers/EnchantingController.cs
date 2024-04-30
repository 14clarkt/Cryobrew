using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Enchanting;

namespace API.Controllers
{
    [AllowAnonymous]
    public class EnchantingController : BaseApiController
    {
        [HttpGet] //api/enchanting
        public async Task<IActionResult> GetEnchs()
        {
            return HandleResult(await Mediator.Send(new ListEnch.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateEnch(Enchantment ench)
        {
            return HandleResult(await Mediator.Send(new CreateEnch.Command{Enchantment = ench}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnch(Guid id, Enchantment ench)
        {
            ench.Id = id;
            return HandleResult(await Mediator.Send(new UpdateEnch.Command{Enchantment = ench}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEQ(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteEnch.Command{Id = id}));
        }
    }
}