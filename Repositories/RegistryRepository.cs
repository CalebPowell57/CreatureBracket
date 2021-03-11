using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class RegistryRepository : ModelRepository<RegistryItem>
    {
        public RegistryRepository(DatabaseContext context) : base(context) { }

        public async Task<RegistryItem> GetByKeyAsync(string key)
        {
            var registryItem = await _context.Registry.SingleOrDefaultAsync(x => x.Key.ToLower() == key.ToLower());

            return registryItem;
        }
    }
}
