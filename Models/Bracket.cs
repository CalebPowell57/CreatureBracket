using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CreatureBracket.Models
{
    public class Bracket : BaseModel
    {
        public enum EStatus { Open, Started, Completed }

        public EStatus Status { get; set; }
        public DateTime? CreatureEntryDeadline { get; set; }
        public Guid? WinnerId { get; set; }

        #region navigation properties
        [NotMapped]
        public List<Creature> Creatures { get; set; }

        [NotMapped]
        public List<CreatureSubmission> CreatureRequests { get; set; }

        [NotMapped]
        public List<Round> Rounds { get; set; }

        [NotMapped]
        public Creature Winner { get; set; }
        #endregion
    }
}
