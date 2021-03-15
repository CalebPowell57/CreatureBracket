using System;
using System.Collections.Generic;

namespace CreatureBracket.DTOs.Responses
{
    public class MatchupResponseDTO
    {
        public bool Current { get; set; }
        public Guid MatchupId { get; set; }
        public List<CreatureResponseDTO> Contestants { get; set; }
        public VoteResponseDTO Vote { get; set; }
    }
}
