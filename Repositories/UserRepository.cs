using CreatureBracket.Misc;
using CreatureBracket.Models;

namespace CreatureBracket.Repositories
{
    public class UserRepository : ModelRepository<User>
    {
        public UserRepository(DatabaseContext context) : base(context) { }
    }
}
