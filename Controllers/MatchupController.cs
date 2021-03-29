using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CreatureBracket.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MatchupController : ControllerBase
    {
        private readonly ILogger<MatchupController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public MatchupController(ILogger<MatchupController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var brackets = await _unitOfWork.MatchupRepository.Get().ToListAsync();

            return Ok(brackets);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Matchup matchup)
        {
            await _unitOfWork.MatchupRepository.PostAsync(matchup);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _unitOfWork.MatchupRepository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
