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
    public class SecurityController : ControllerBase
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public SecurityController(ILogger<SecurityController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticationRequestDTO dto)
        {
            var response = await _unitOfWork.SecurityRepository.AuthenticateAsync(dto);
            await _unitOfWork.SaveAsync();

            //Response.Headers.Add("Set-Cookie", $"access_token={response.JWT}");
            Response.Cookies.Append("access_token", response.JWT);

            return Ok(response);
        }

        [HttpPost("Verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyRequestDTO dto)
        {
            var response = await _unitOfWork.SecurityRepository.VerifyAsync(dto);
            await _unitOfWork.SaveAsync();

            return Ok(response);
        }
    }
}
