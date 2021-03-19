using System;

namespace CreatureBracket.DTOs.Responses
{
    public class UserMatchupResponseDTO
    {
        public UserCreatureResponseDTO Creature1 { get; set; }
        public UserCreatureResponseDTO Creature2 { get; set; }
        public int RoundRank { get; set; }
        public int MatchupSeed { get; set; }
        public bool Unset { get; set; }
        public Guid MatchupId { get; set; }
    }
}
