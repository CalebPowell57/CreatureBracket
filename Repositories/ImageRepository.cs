using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Repositories
{
    public class ImageRepository : ModelRepository<Creature>
    {
        public ImageRepository(DatabaseContext context) : base(context) { }

        public async Task<List<Image>> ImagesAsync(ImageRequestDTO dto)
        {
            var images = new List<Image>();

            switch (dto.Type)
            {
                case EImageType.Creatures:
                    images = await _context.Creatures.Where(x => dto.Keys.Contains(x.Id.ToString())).Select(x => new Image { Key = x.Id.ToString(), Base64 = x.Image }).ToListAsync();
                    break;
                case EImageType.CreatureSubmissions:
                    images = await _context.CreatureSubmissions.Where(x => dto.Keys.Contains(x.Id.ToString())).Select(x => new Image { Key = x.Id.ToString(), Base64 = x.Image }).ToListAsync();
                    break;
                case EImageType.Account:
                    foreach (var userName in dto.Keys)
                    {
                        var userInfo = ADUserInfo.GetByUserName(userName);

                        var image = new Image
                        {
                            Base64 = userInfo.Image,
                            Key = userName
                        };

                        images.Add(image);
                    }
                    break;
                default:
                    throw new System.Exception("'ImageRepository.ImagesAsync()': Invalid Image Type.");
            }

            return images;
        }
    }
}
