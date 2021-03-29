using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class CreatureRepository : ModelRepository<Creature>
    {
        public CreatureRepository(DatabaseContext context) : base(context) { }

    }
}
