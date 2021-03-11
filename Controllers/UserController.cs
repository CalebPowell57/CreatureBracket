using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
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
        private readonly EmailService _emailService;

        public UserController(ILogger<UserController> logger, UnitOfWork unitOfWork, EmailService emailService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO dto)
        {
            var verifyKey = _unitOfWork.UserRepository.Register(dto);
            await _unitOfWork.SaveAsync();

            var sendGridApiKeyRegistryItem = await _unitOfWork.RegistryRepository.GetByKeyAsync("SendGridApiKey");

            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            await _emailService.SendConfirmationRequestAsync(sendGridApiKeyRegistryItem.Value, dto.EmailAddress, $"{dto.FirstName} {dto.LastName}", verifyKey, baseUrl);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyRequestDTO dto)
        {
            await _unitOfWork.UserRepository.VerifyAsync(dto);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
