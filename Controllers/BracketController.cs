﻿using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
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

        [HttpGet("Global")]
        public async Task<IActionResult> Global([FromQuery] Guid accountId)
        {
            var response = await _unitOfWork.BracketRepository.GlobalAsync(accountId);

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
