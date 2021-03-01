using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class BracketRepository : BaseRepository
    {
        public BracketRepository(DatabaseContext context) : base(context) { }

        public async Task<Bracket> ActiveAsync()
        {
            var activeBracket = await _context.Brackets.OrderBy(x => x.CreatureEntryDeadline).Take(1).SingleAsync();

            return activeBracket;
        }
    }
}
