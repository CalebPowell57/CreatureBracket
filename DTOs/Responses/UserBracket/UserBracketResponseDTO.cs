using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class UserBracketResponseDTO
    {
        public List<UserRoundResponseDTO> Rounds { get; set; }
        public string UserName { get; set; }
    }
}
