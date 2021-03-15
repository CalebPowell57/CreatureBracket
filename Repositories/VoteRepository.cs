using CreatureBracket.Misc;
using CreatureBracket.Models;

namespace CreatureBracket.Repositories
{
    public class VoteRepository : ModelRepository<Vote>
    {
        public VoteRepository(DatabaseContext context) : base(context) { }
    }
}
