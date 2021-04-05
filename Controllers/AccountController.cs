using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CreatureBracket.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<VoteController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public AccountController(ILogger<VoteController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet("Information")]
        public IActionResult Information([FromQuery] string userName)
        {
            var information = _unitOfWork.AccountRepository.GetInformation(userName);

            return Ok(information);
        }
    }
}
