using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace CreatureBracket.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BracketController : ControllerBase
    {
        private readonly ILogger<BracketController> _logger;
        private readonly UnitOfWork _unitOfWork;

        public BracketController(ILogger<BracketController> logger, UnitOfWork unitOfWork)
        {
            _logger = logger;

            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var brackets = await _unitOfWork.BracketRepository.Get().ToListAsync();

            return Ok(brackets);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bracket bracket)
        {
            await _unitOfWork.BracketRepository.PostAsync(bracket);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        //cascade delete is on and we need to turn this off before we even think about uncommenting this.
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete([FromRoute] Guid id)
        //{
        //    await _unitOfWork.BracketRepository.DeleteAsync(id);
        //    await _unitOfWork.SaveAsync();

        //    return Ok();
        //}

        [HttpGet("Active")]
        public async Task<IActionResult> Active()
        {
            var response = await _unitOfWork.BracketRepository.ActiveAsync();

            return Ok(response);
        }

        [AllowAnonymous]//this is anonymous as we need it to check the status for the nav menu item visibility
        [HttpGet("ActiveStatus")]
        public async Task<IActionResult> ActiveStatus()
        {
            var response = await _unitOfWork.BracketRepository.ActiveStatusAsync();

            return Ok(response);
        }

        [HttpGet("CanEditMyBracket")]
        public async Task<IActionResult> GetCanEditMyBracket()
        {
            var response = await _unitOfWork.BracketRepository.CanEditMyBracketAsync();

            return Ok(response);
        }

        [HttpGet("Standings")]
        public async Task<IActionResult> Standings()
        {
            var response = await _unitOfWork.BracketRepository.StandingsAsync();

            return Ok(response);
        }

        [HttpGet("SeedCreatures")]
        public async Task<IActionResult> SeedCreatures()
        {
            var response = await _unitOfWork.BracketRepository.SeedCreaturesAsync();
            await _unitOfWork.SaveAsync();

            return Ok(response);
        }

        [HttpGet("CurrentStandings")]
        public async Task<IActionResult> GetCurrentStandings()
        {
            var response = await _unitOfWork.BracketRepository.GetCurrentSeedStandings();
            await _unitOfWork.SaveAsync();

            return Ok(response);
        }

        [HttpGet("Global")]
        public async Task<IActionResult> Global([FromQuery] string userName)
        {
            var response = await _unitOfWork.BracketRepository.GlobalAsync(userName);

            return Ok(response);
        }

        [HttpGet("GlobalTestData")]
        public IActionResult GlobalTestData()
        {
            var response = _unitOfWork.BracketRepository.BracketTestData();

            return Ok(response);
        }

        [HttpGet("StartBracket")]
        public async Task<IActionResult> Approve()
        {
            await _unitOfWork.BracketRepository.StartAsync();
            await _unitOfWork.SaveAsync();

            return Ok();
        }
    }
}
