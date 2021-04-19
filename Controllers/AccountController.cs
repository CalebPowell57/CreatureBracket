using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

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

        [HttpGet("Settings")]
        public async Task<IActionResult> Settings([FromQuery] string userName)
        {
            var settings = await _unitOfWork.AccountRepository.GetSettingDTOsAsync(userName);

            return Ok(settings);
        }

        [HttpPost("Setting")]
        public async Task<IActionResult> Setting([FromBody] SaveAccountSettingRequestDTO dto)
        {
            await _unitOfWork.AccountRepository.SaveSettingAsync(dto);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpGet("AccountSettings")]
        public async Task<IActionResult> AccountSettings([FromQuery] string userName)
        {
            var settings = await _unitOfWork.AccountRepository.GetSettingsAsync(userName);

            return Ok(settings);
        }
    }
}
