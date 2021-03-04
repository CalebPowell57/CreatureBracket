using CreatureBracket.Misc;
using CreatureBracket.Models;

namespace CreatureBracket.Repositories
{
    public class UserBracketRepository : ModelRepository<UserBracket>
    {
        public UserBracketRepository(DatabaseContext context) : base(context) { }
    }
}
