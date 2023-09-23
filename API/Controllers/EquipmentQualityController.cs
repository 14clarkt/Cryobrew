using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ActionPointCards;
using Application.EquipmentQualities;

namespace API.Controllers
{
    [AllowAnonymous]
    public class EquipmentQualityController : BaseApiController
    {
        [HttpGet] //api/equipmentquality
        public async Task<IActionResult> GetEQs()
        {
            return HandleResult(await Mediator.Send(new ListEQ.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateEQ(EquipmentQuality eq)
        {
            return HandleResult(await Mediator.Send(new CreateEQ.Command{EquipmentQuality = eq}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEQ(Guid id, EquipmentQuality eq)
        {
            eq.Id = id;
            return HandleResult(await Mediator.Send(new UpdateEQ.Command{EquipmentQuality = eq}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEQ(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteEQ.Command{Id = id}));
        }
    }
}