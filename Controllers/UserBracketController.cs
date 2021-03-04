using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserBracket bracket)
        {
            await _unitOfWork.UserBracketRepository.PostAsync(bracket);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
