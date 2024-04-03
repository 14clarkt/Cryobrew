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
    }
}