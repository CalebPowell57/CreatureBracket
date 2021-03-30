using System;

namespace CreatureBracket.Models
{
    public class ChatMessage : BaseModel
    {
        public Guid AccountId { get; set; }
        public string Message { get; set; }
        public DateTime SystemDateTime { get; set; }
    }
}
