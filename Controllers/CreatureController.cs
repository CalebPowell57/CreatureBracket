using CreatureBracket.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CreatureBracket.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CreatureController : ControllerBase
    {
        private readonly ILogger<CreatureController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public CreatureController(ILogger<CreatureController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }
    }
}
