using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class RoundResponseDTO
    {
        public List<MatchupResponseDTO> Matchups { get; set; }
        public int Rank { get; set; }
    }
}
