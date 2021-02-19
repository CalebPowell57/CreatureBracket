using System;
using System.Collections.Generic;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Models
{
    public class UserRound : BaseModel
    {
        public Guid UserBracketId { get; set; }
        public ERoundType RoundType { get; set; }

        #region navigation properties
        public UserBracket Bracket { get; set; }
        public List<UserMatchup> Matchups { get; set; }
        #endregion
    }
}
