﻿using Newtonsoft.Json;
using System;

namespace CreatureBracket.Models
{
    public class Vote : BaseModel
    {
        public Guid MatchupId { get; set; }
        public Guid UserId { get; set; }
        public Guid CreatureId { get; set; }

        #region navigation properties
        public Creature Creature { get; set; }
        public User User { get; set; }
        [JsonIgnore]
        public Matchup Matchup { get; set; }
        #endregion
    }
}
