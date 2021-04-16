using System;
using System.Collections.Generic;

namespace CreatureBracket.Models
{
    public class Round : BaseModel
    {
        public Guid BracketId { get; set; }
        public int Rank { get; set; }
        public int CreatureCount { get; set; }
        public DateTime VoteDeadline { get; set; }
        public bool EmailReminderSent { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        public List<Matchup> Matchups { get; set; }
        #endregion
    }
}
