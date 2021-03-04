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
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public UserController(ILogger<UserController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            await _unitOfWork.UserRepository.PostAsync(user);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
