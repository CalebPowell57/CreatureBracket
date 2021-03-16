using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CreatureBracket.Controllers
{
    [Authorize(Policy = Constants.AuthPolicyUserCredentials)]
    [ApiController]
    [Route("api/[controller]")]
    public class UserBracketController : ControllerBase
    {
        private readonly ILogger<UserBracketController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public UserBracketController(ILogger<UserBracketController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet("MyBracket")]
        public async Task<IActionResult> MyBracket([FromQuery] Guid userId)
        {
            var activeBracket = await _unitOfWork.BracketRepository.ActiveAsync();
            var myBracket = await _unitOfWork.UserBracketRepository.MyBracketAsync(userId, activeBracket.Id);

            return Ok(myBracket);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserBracket bracket)
        {
            await _unitOfWork.UserBracketRepository.PostAsync(bracket);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
