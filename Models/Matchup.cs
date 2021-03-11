using Newtonsoft.Json;
using System;

namespace CreatureBracket.Models
{
    public class Matchup : BaseModel
    {
        public Guid RoundId { get; set; }
        public Guid Creature1Id { get; set; }
        public Guid Creature2Id { get; set; }
        public Guid? WinnerId { get; set; }
        public Guid? LoserId { get; set; }
        public int Creature1Votes { get; set; }
        public int Creature2Votes { get; set; }

        #region navigation properties
        public Creature Creature1 { get; set; }
        public Creature Creature2 { get; set; }
        public Creature Winner { get; set; }
        public Creature Loser { get; set; }
        [JsonIgnore]
        public Round Round { get; set; }
        #endregion
    }
}
