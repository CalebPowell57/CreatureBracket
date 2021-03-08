using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace CreatureBracket.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class EmailSenderController : ControllerBase
    {
        private readonly ILogger<EmailSenderController> _logger;
        private readonly UnitOfWork _unitOfWork;
        private readonly EmailService _emailService;

        public EmailSenderController(ILogger<EmailSenderController> logger, UnitOfWork unitOfWork, EmailService emailService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _emailService = emailService;
        }

        [HttpPost("Test")]
        public async Task<IActionResult> Test([FromBody] EmailTestRequestDTO dto)
        {
            var response = await _emailService.SendTestAsync(dto.EmailAddress, dto.ToName);

            return Ok(response);
        }
    }
}
