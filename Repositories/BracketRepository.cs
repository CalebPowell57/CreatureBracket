using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
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

            var activeBracket = await _context.Brackets.OrderBy(x => x.CreatureEntryDeadline).Take(1).SingleAsync();

            return activeBracket;
        }
    }
}
