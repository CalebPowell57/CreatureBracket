using System;
using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class MatchupResponseDTO
    {
        public bool Current { get; set; }
        public Guid? MatchupId { get; set; }
        public List<CreatureResponseDTO> Contestants { get; set; }
        public VoteResponseDTO Vote { get; set; }
        public int RoundRank { get; set; }
        public int MatchupSeed { get; set; }
        public bool Unset { get; set; }
    }
}
