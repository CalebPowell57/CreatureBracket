using System;

namespace CreatureBracket.DTOs.Responses
{
    public class VoteResponseDTO
    {
        public Guid? VoteId { get; set; }
        public Guid? CreatureId { get; set; }
    }
}
