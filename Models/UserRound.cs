using System;
using System.Collections.Generic;

namespace CreatureBracket.Models
{
    public class UserRound : BaseModel
    {
        public Guid UserBracketId { get; set; }
        public int Rank { get; set; }

        #region navigation properties
        public UserBracket Bracket { get; set; }
        public List<UserMatchup> Matchups { get; set; }
        #endregion
    }
}
