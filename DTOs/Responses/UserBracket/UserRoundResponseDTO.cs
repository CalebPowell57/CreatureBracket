using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class UserRoundResponseDTO
    {
        public List<UserMatchupResponseDTO> Matchups { get; set; }
        public int Rank { get; set; }
    }
}
