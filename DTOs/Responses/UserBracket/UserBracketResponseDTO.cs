using System;
using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class UserBracketResponseDTO
    {
        public List<UserRoundResponseDTO> Rounds { get; set; }
        public Guid UserId { get; set; }
    }
}
