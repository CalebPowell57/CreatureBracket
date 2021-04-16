using CreatureBracket.DTOs.Requests;
using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class AccountRepository : BaseRepository
    {
        public AccountRepository(DatabaseContext context) : base(context) { }

        public ADUserInfo GetInformation(string userName)
        {
            var userInfo = ADUserInfo.GetByUserName(userName);

            return userInfo;
        }

        public async Task<List<AccountSettingGroupResponseDTO>> GetSettingDTOsAsync(string userName)
        {
            var mapper = new SettingMapper();

            var registryRows = await _context.Registry.AsNoTracking().Where(x => x.Key.StartsWith(mapper.UserSettingString(userName))).ToListAsync();

            var response = mapper.ToDTOs(registryRows);

            return response;
        }

        public async Task<SettingMapper> GetSettingsAsync(string userName)
        {
            var mapper = new SettingMapper();

            var registryRows = await _context.Registry.AsNoTracking().Where(x => x.Key.StartsWith(mapper.UserSettingString(userName))).ToListAsync();

            mapper.Deserialize(registryRows);

            return mapper;
        }

        public async Task SaveSettingAsync(SaveAccountSettingRequestDTO dto)
        {
            var mapper = new SettingMapper();

            var registryItemKey = $"{mapper.UserSettingString(dto.UserName)}{dto.Key}";
            var registryItemValue = dto.Value.ToString();

            var existingRegistryItem = await _context.Registry.SingleOrDefaultAsync(x => x.Key == registryItemKey);

            if (existingRegistryItem != null)
            {
                existingRegistryItem.Value = registryItemValue;
            }
            else
            {
                var newRegistryItem = new RegistryItem
                {
                    Id = Guid.NewGuid(),
                    Key = registryItemKey,
                    Value = registryItemValue
                };

                _context.Registry.Add(newRegistryItem);
            }
        }
    }
}
