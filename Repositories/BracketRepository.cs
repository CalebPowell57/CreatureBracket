using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class BracketRepository : ModelRepository<Bracket>
    {
        public BracketRepository(DatabaseContext context) : base(context) { }

        public async Task<Bracket> ActiveAsync()
        {
            if (!await _context.Brackets.AnyAsync())
            {
                return null;
            }

            var activeBracket = await _context.Brackets.AsNoTracking().OrderBy(x => x.CreatureEntryDeadline).Take(1).SingleAsync();

            return activeBracket;
        }

        public async Task<List<StandingsItemDTO>> StandingsAsync()
        {
            if (!await _context.Brackets.AnyAsync())
            {
                return null;
            }

            var activeBracket = await ActiveAsync();

            var standings = new List<StandingsItemDTO>();

            var userBrackets = await _context.UserBrackets.Include(x => x.User).Where(x => x.BracketId == activeBracket.Id).ToListAsync();

            foreach (var userBracket in userBrackets)
            {
                var standingItem = new StandingsItemDTO
                {
                    FirstName = userBracket.User.FirstName,
                    LastName = userBracket.User.LastName,
                    Points = 0,
                    Rank = 1
                };

                standings.Add(standingItem);
            }

            return standings;
        }
    }
}
