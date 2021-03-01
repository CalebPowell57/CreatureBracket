using System;

namespace CreatureBracket.DTOs.Responses
{
    public class AuthenticationResponseDTO
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JWT { get; set; }
    }
}
