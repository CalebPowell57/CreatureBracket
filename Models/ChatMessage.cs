using System;

namespace CreatureBracket.Models
{
    public class ChatMessage : BaseModel
    {
        public Guid UserId { get; set; }
        public string Message { get; set; }
        public DateTime SystemDateTime { get; set; }

        #region navigation properties
        public User User { get; set; }
        #endregion
    }
}
