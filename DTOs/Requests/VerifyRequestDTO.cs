using System;

namespace CreatureBracket.DTOs.Requests
{
    public class VerifyRequestDTO
    {
        public string EmailAddress { get; set; }
        public Guid Hash { get; set; }
    }
}
