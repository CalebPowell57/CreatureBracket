using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CreatureSubmissionController : ControllerBase
    {
        private readonly ILogger<CreatureSubmissionController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public CreatureSubmissionController(ILogger<CreatureSubmissionController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreatureSubmissionRequestDTO submission)
        {
            var activeBracket = await _unitOfWork.BracketRepository.ActiveAsync();

            _unitOfWork.CreatureSubmissionRepository.Post(submission, activeBracket.Id);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var submissions = await _unitOfWork.CreatureSubmissionRepository.Get().ToListAsync();

            return Ok(submissions);
        }

        [HttpPost("Approve")]
        public async Task<IActionResult> Approve([FromBody] ApproveSubmissionRequestDTO dto)
        {
            var isLast = await _unitOfWork.CreatureSubmissionRepository.ApproveAsync(dto);

            await _unitOfWork.SaveAsync();

            if (isLast)
            {
                await _unitOfWork.BracketRepository.SeedCreaturesAsync();//remove once seeding view has been created.
                await _unitOfWork.BracketRepository.StartAsync();
                await _unitOfWork.SaveAsync();
            }

            return Ok();
        }

        [HttpGet("ByStatus")]
        public async Task<IActionResult> ByStatus()
        {
            var submissions = await _unitOfWork.CreatureSubmissionRepository.ByStatusAsync();

            return Ok(submissions);
        }
    }
}
