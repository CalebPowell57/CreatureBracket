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
    [Authorize(Policy = Constants.AuthPolicyUserCredentials)]
    [ApiController]
    [Route("api/[controller]")]
    public class BracketController : ControllerBase
    {
        private readonly ILogger<BracketController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public BracketController(ILogger<BracketController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var brackets = await _unitOfWork.BracketRepository.Get().ToListAsync();

            return Ok(brackets);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bracket bracket)
        {
            await _unitOfWork.BracketRepository.PostAsync(bracket);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _unitOfWork.BracketRepository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpGet("Active")]
        public async Task<IActionResult> Active()
        {
            var response = await _unitOfWork.BracketRepository.ActiveAsync();

            return Ok(response);
        }
    }
}
