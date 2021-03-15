using CreatureBracket.Misc;
using CreatureBracket.Models;

namespace CreatureBracket.Repositories
{
    public class MatchupRepository : ModelRepository<Matchup>
    {
        public MatchupRepository(DatabaseContext context) : base(context) { }
    }
}
