using System;

namespace CreatureBracket.DTOs.Responses
{
    public class UserCreatureResponseDTO
    {
        public Guid CreatureId { get; set; }
        public string Name { get; set; }
        public string BIO { get; set; }
        public string Image { get; set; }
        public bool Winner { get; set; }
        public bool Unset { get; set; }
    }
}
