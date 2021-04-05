using System;

namespace CreatureBracket.Models
{
    public class ChatMessage : BaseModel
    {
        public string UserName { get; set; }
        public string Message { get; set; }
        public DateTime SystemDateTime { get; set; }
    }
}
