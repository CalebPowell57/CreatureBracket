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
    public class VoteController : ControllerBase
    {
        private readonly ILogger<VoteController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public VoteController(ILogger<VoteController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var brackets = await _unitOfWork.VoteRepository.Get().ToListAsync();

            return Ok(brackets);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Vote vote)
        {
            await _unitOfWork.VoteRepository.PostAsync(vote);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _unitOfWork.VoteRepository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
