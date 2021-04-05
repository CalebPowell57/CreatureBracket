using System;
using System.Collections.Generic;

namespace CreatureBracket.Models
{
    public class UserBracket : BaseModel
    {
        public string UserName { get; set; }
        public Guid BracketId { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        public List<UserRound> Rounds { get; set; }
        #endregion
    }
}
