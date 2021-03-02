using CreatureBracket.Misc;
using CreatureBracket.Models;

namespace CreatureBracket.Repositories
{
    public class CreatureRepository : ModelRepository<Creature>
    {
        public CreatureRepository(DatabaseContext context) : base(context) { }
    }
}
