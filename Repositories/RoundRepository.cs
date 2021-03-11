using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class RoundRepository : ModelRepository<Round>
    {
        public RoundRepository(DatabaseContext context) : base(context) { }

        public async Task<Round> ActiveAsync(Guid activeBracketId)
        {
            var round = await _context.Rounds.Include(x => x.Matchups)
                                                .ThenInclude(x => x.Creature1)
                                             .Include(x => x.Matchups)
                                                .ThenInclude(x => x.Creature2)
                                             .Where(x => x.BracketId == activeBracketId)
                                             .OrderByDescending(x => x.Rank)
                                             .Take(1)
                                             .SingleOrDefaultAsync();

            return round;
        }
    }
}
