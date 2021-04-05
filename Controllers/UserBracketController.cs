using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CreatureBracket.Controllers
{
    [Authorize]
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

        [HttpGet("MyBracket")]
        public async Task<IActionResult> MyBracket([FromQuery] string userName)
        {
            var activeBracket = await _unitOfWork.BracketRepository.ActiveAsync();
            var myBracket = await _unitOfWork.UserBracketRepository.MyBracketAsync(userName, activeBracket.Id);

            return Ok(myBracket);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] UserBracketResponseDTO dto)
        {
            var activeBracket = await _unitOfWork.BracketRepository.ActiveAsync();

            var userBracket = await _unitOfWork.UserBracketRepository.ExistingUserBracket(activeBracket.Id, dto.UserName);

            if (userBracket is null)
            {
                _unitOfWork.UserBracketRepository.AddUserBracketFromDTO(dto, activeBracket.Id);
            }
            else
            {
                await _unitOfWork.UserBracketRepository.UpdateMatchupsAsync(dto, userBracket.Id);
            }

            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
