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
    public class ImageController : ControllerBase
    {
        private readonly ILogger<ImageController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public ImageController(ILogger<ImageController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Images([FromBody] ImageRequestDTO dto)
        {
            var images = await _unitOfWork.ImageRepository.ImagesAsync(dto);

            return Ok(images);
        }
    }
}
