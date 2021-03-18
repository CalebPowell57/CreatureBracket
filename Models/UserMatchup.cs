using System;

namespace CreatureBracket.Models
{
    public class UserMatchup : BaseModel
    {
        public Guid UserRoundId { get; set; }
        public Guid? Creature1Id { get; set; }
        public Guid? Creature2Id { get; set; }
        public Guid? WinnerId { get; set; }
        public int Seed { get; set; }

        #region navigation properties
        public Creature Creature1 { get; set; }
        public Creature Creature2 { get; set; }
        public Creature Winner { get; set; }
        public UserRound Round { get; set; }
        #endregion
    }
}
