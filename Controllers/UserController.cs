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
            var verifyGuid = _unitOfWork.UserRepository.Register(dto);
            await _unitOfWork.SaveAsync();

            await _emailService.SendConfirmationRequestAsync(dto.EmailAddress, $"{dto.FirstName} {dto.LastName}", verifyGuid);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyRequestDTO dto)
        {
            var response = await _unitOfWork.UserRepository.VerifyAsync(dto);
            await _unitOfWork.SaveAsync();

            return Ok(response);
        }
    }
}
