using System;
using System.Collections.Generic;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Models
{
    public class Round : BaseModel
    {
        public Guid BracketId { get; set; }
        public ERoundType Type { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        public List<Matchup> Matchups { get; set; }
        #endregion
    }
}
