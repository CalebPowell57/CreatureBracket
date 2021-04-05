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

        static Image GetUserPicture(string userName)
        {
            using (DirectorySearcher dsSearcher = new DirectorySearcher())
            {
                dsSearcher.Filter = "(&(objectClass=user) (cn=Caleb Powell))";
                SearchResult result = dsSearcher.FindOne();

                using (DirectoryEntry user = new DirectoryEntry(result.Path))
                {
                    byte[] data = user.Properties["thumbnailPhoto"].Value as byte[];

                    var names = "";

                    foreach(PropertyValueCollection prop in user.Properties)
                    {
                        if (prop.PropertyName == "objectGUID")
                        {
                            names += new Guid(prop.Value as byte[]).ToString() + "\n";
                        }
                        else
                        {
                            names += prop.Value + "\n";
                        }
                    }

                    var base64 = Convert.ToBase64String(data);

                    if (data != null)
                    {
                        using (MemoryStream s = new MemoryStream(data))
                        {
                            return Bitmap.FromStream(s);
                        }
                    }

                    return null;
                }
            }
        }

        private PrincipalSearchResult<Principal> getusers()
        {
            using (var ctx = new PrincipalContext(ContextType.Domain, "fusionmgt"))
            {
                var myDomainUsers = new List<string>();
                var userPrinciple = new UserPrincipal(ctx);
                using (var search = new PrincipalSearcher(userPrinciple))
                {
                    //foreach (var domainUser in search.FindAll())
                    //{
                    //    if (domainUser.DisplayName != null)
                    //    {
                    //        myDomainUsers.Add(domainUser.DisplayName);
                    //    }
                    //}

                    var results = search.FindAll();

                    var me = results.Single(x => x.Name.ToLower().Contains("caleb"));

                    return results;
                }
            }
        }

        [HttpGet("Active")]
        public async Task<IActionResult> Active()
        {
            //var b = getusers();

            //var c = GetUserPicture("");

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
