using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class CreatureRepository : ModelRepository<Creature>
    {
        public CreatureRepository(DatabaseContext context) : base(context) { }

        public async Task<List<Image>> ImagesAsync(CreatureImagesRequestDTO dto)
        {
            var images = await _context.Creatures.Where(x => dto.CreatureIds.Contains(x.Id)).Select(x => new Image { Key = x.Id.ToString(), Base64 = x.Image }).ToListAsync();

            return images;
        }
    }
}
