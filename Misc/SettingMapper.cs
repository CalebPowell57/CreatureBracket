using CreatureBracket.Attributes;
using CreatureBracket.DTOs.Responses;
using CreatureBracket.Models;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CreatureBracket.Misc
{
    public class SettingMapper
    {
        [SettingGroup("Notifications")]
        [SettingTitle("Voting Deadline")]
        [SettingDescription("Will send an email to you the morning that the current round battles will occur.")]
        public bool VoteDeadline { get; set; } = true;

        [SettingGroup("Notifications")]
        [SettingTitle("Chat Alerts")]
        [SettingDescription("Sends chat alerts when any user posts a new message in the discussion board.")]
        public bool Chat { get; set; } = true;

        public string UserSettingString(string userName)
        {
            return $"Account/Setting/{userName}/";
        }

        public void Deserialize(List<RegistryItem> accountRegistryItems)
        {
            foreach (var property in GetType().GetProperties())
            {
                var registryItem = accountRegistryItems.SingleOrDefault(x => x.Key.EndsWith(property.Name));

                if (registryItem != null)
                {
                    property.SetValue(this, bool.Parse(registryItem.Value));
                }
            }
        }

        public List<AccountSettingGroupResponseDTO> ToDTOs(List<RegistryItem> accountRegistryItems)
        {
            var groups = new List<AccountSettingGroupResponseDTO>();

            foreach (var property in GetType().GetProperties())
            {
                var groupAttribute = property.GetCustomAttribute<SettingGroupAttribute>();
                var titleAttribute = property.GetCustomAttribute<SettingTitleAttribute>();
                var descriptionAttribute = property.GetCustomAttribute<SettingDescriptionAttribute>();

                var group = groups.SingleOrDefault(x => x.Title == groupAttribute.GroupName) ?? new AccountSettingGroupResponseDTO
                {
                    Title = groupAttribute.GroupName,
                    Settings = new List<AccountSettingResponseDTO>()
                };

                var registryItem = accountRegistryItems.SingleOrDefault(x => x.Key.EndsWith(property.Name));

                var setting = new AccountSettingResponseDTO
                {
                    Title = titleAttribute.Title,
                    Description = descriptionAttribute.Description,
                    Key = property.Name,
                    Value = registryItem is null ? true : bool.Parse(registryItem.Value)
                };

                group.Settings.Add(setting);

                if (!groups.Any(x => x.Title == group.Title))
                {
                    groups.Add(group);
                }
            }

            return groups;
        }
    }
}
