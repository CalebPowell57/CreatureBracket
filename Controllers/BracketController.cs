using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace CreatureBracket.Controllers
{
    [Authorize(Policy = Constants.AuthPolicyUserCredentials)]
    [ApiController]
    [Route("[controller]")]
    public class BracketController : ControllerBase
    {
        private readonly ILogger<BracketController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public BracketController(ILogger<BracketController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet("Active")]
        public async Task<IActionResult> Active()
        {
            var response = await _unitOfWork.BracketRepository.ActiveAsync();

            return Ok(response);
        }
    }
}
