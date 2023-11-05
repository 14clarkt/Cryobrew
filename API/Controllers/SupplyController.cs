using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Supply;

namespace API.Controllers
{
    [AllowAnonymous]
    public class SupplyController : BaseApiController
    {
        [HttpGet] //api/supply
            public async Task<IActionResult> GetSupplies()
        {
            return HandleResult(await Mediator.Send(new ListSupply.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateSupply(Supply supply)
        {
            return HandleResult(await Mediator.Send(new CreateSupply.Command{Supply = supply}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupply(Guid id, Supply supply)
        {
            supply.Id = id;
            return HandleResult(await Mediator.Send(new UpdateSupply.Command{Supply = supply}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupply(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteSupply.Command{Id = id}));
        }
    }
}