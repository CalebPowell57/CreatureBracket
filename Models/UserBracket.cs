using System;
using System.Collections.Generic;

namespace CreatureBracket.Models
{
    public class UserBracket : BaseModel
    {
        public Guid AccountId { get; set; }
        public Guid BracketId { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        public List<UserRound> Rounds { get; set; }
        #endregion
    }
}
