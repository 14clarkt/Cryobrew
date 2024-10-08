using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ActionPointCards;
using Application.Alchemy;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AlchemyController : BaseApiController
    {
        [HttpGet("trait")] //api/alchemy/trait
        public async Task<IActionResult> GetAlchemyTraits()
        {
            return HandleResult(await Mediator.Send(new ListAlchemyTrait.Query()));
        }

        [HttpPost("trait")]
        public async Task<IActionResult> CreateAlchemyTrait(AlchemyTrait trait)
        {
            return HandleResult(await Mediator.Send(new CreateAlchemyTrait.Command{AlchemyTrait = trait}));
        }

        [HttpDelete("trait/{id}")]
        public async Task<IActionResult> DeleteAlchemyTrait(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteAlchemyTrait.Command{Id = id}));
        }

        [HttpPut("trait/{id}")]
        public async Task<IActionResult> UpdateAlchemyTrait(Guid id, AlchemyTrait at)
        {
            at.Id = id;
            return HandleResult(await Mediator.Send(new UpdateAlchemyTrait.Command{AlchemyTrait = at}));
        }

        [HttpPost("potencyrange/{id}")] 
        public async Task<IActionResult> CreateAlchemyPotencyRange(AlchemyPotencyRange apr, Guid id)
        {
            return HandleResult(await Mediator.Send(new CreateAPR.Command{AlchemyPotencyRange = apr, ATId = id}));
        }

        [HttpPut("potencyrange/{id}")]
        public async Task<IActionResult> EditAlchemyPotencyRange(AlchemyPotencyRange apr)
        {
            return HandleResult(await Mediator.Send(new UpdateAPR.Command{AlchemyPotencyRange = apr}));
        }

        [HttpDelete("potencyrange/{atid}/{aprid}")]
        public async Task<IActionResult> DeleteAlchemyPotencyRange(Guid atid, Guid aprid)
        {
            return HandleResult(await Mediator.Send(new DeleteAPR.Command{ATId = atid, APRId = aprid}));
        }

        // Ingredients

        [HttpGet("ingredient")] //api/alchemy/ingredient
        public async Task<IActionResult> GetAlchemyIngredients()
        {
            return HandleResult(await Mediator.Send(new ListAlchemyIngredients.Query()));
        }

        [HttpPost("ingredient")]
        public async Task<IActionResult> CreateAlchemyIngredient(AlchemyIngredient ing)
        {
            return HandleResult(await Mediator.Send(new CreateAlchemyIngredient.Command{AlchemyIngredient = ing}));
        }
        
        [HttpPut("ingredient/{id}")]
        public async Task<IActionResult> UpdateAlchemyIngredient(Guid id, AlchemyIngredient ing)
        {
            ing.Id = id;
            return HandleResult(await Mediator.Send(new UpdateAlchemyIngredient.Command{AlchemyIngredient = ing}));
        }

        [HttpDelete("ingredient/{id}")]
        public async Task<IActionResult> DeleteAlchemyIngredient(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteAlchemyIngredient.Command{Id = id}));
        }

        [HttpPost("ingredientpotency/{id}")] 
        public async Task<IActionResult> CreateAlchemyIngredientPotency(AlchemyIngredientPotency aip, Guid id)
        {
            return HandleResult(await Mediator.Send(new CreateAIP.Command{AlchemyIngredientPotency = aip, AIid = id}));
        }

        [HttpDelete("ingredientpotency/{aiid}/{aipid}")]
        public async Task<IActionResult> DeleteAlchemyIngredientPotency(Guid aiid, Guid aipid)
        {
            return HandleResult(await Mediator.Send(new DeleteAIP.Command{AIid = aiid, AIPId = aipid}));
        }

        // Products
        [HttpGet("product")] //api/alchemy/product
        public async Task<IActionResult> GetAlchemyProducts()
        {
            return HandleResult(await Mediator.Send(new ListAlchemyProduct.Query()));
        }

        [HttpPost("product")]
        public async Task<IActionResult> CreateAlchemyProduct(AlchemyProduct product)
        {
            return HandleResult(await Mediator.Send(new CreateAlchemyProduct.Command{AlchemyProduct = product}));
        }

        [HttpPut("product/{id}")]
        public async Task<IActionResult> UpdateAlchemyProduct(AlchemyProduct product, Guid id)
        {
            product.Id = id;
            return HandleResult(await Mediator.Send(new UpdateAlchemyProduct.Command{AlchemyProduct = product}));
        }

        [HttpDelete("product/{id}")]
        public async Task<IActionResult> DeleteAlchemyProduct(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteAlchemyProduct.Command{Id = id}));
        }
    }
}