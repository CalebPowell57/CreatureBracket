using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class AccountSettingGroupResponseDTO
    {
        public string Title { get; set; }
        public List<AccountSettingResponseDTO> Settings { get; set; }
    }
}
