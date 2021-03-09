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
    public class ChatMessageController : ControllerBase
    {
        private readonly ILogger<ChatMessageController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public ChatMessageController(ILogger<ChatMessageController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [AllowAnonymous]//remove this
        [HttpGet("All")]
        public async Task<IActionResult> All()
        {
            var chatMessages = await _unitOfWork.ChatMessageRepository.GetAllAsync();

            return Ok(chatMessages);
        }
    }
}
