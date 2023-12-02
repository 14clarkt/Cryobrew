using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ActionPointCards;
using Application.Rules;

namespace API.Controllers
{
    [AllowAnonymous]
    public class RuleController : BaseApiController
    {
        [HttpGet] //api/actionpointcard
        public async Task<IActionResult> GetRules()
        {
            return HandleResult(await Mediator.Send(new ListRule.Query()));
        }

        [HttpPost] 
        public async Task<IActionResult> CreateRule(Rule rule)
        {
            return HandleResult(await Mediator.Send(new CreateRule.Command{Rule = rule}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRule(Guid id, Rule rule)
        {
            rule.Id = id;
            return HandleResult(await Mediator.Send(new UpdateRule.Command{Rule = rule}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRule(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteRule.Command{Id = id}));
        }
    }
}