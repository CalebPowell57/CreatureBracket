using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CreatureBracket.Models
{
    public class Bracket : BaseModel
    {
        public enum EStatus { Open, Started, Completed }

        public string Title { get; set; }
        public EStatus Status { get; set; }
        public DateTime? BracketSubmissionDeadline { get; set; }
        public Guid? WinnerId { get; set; }
        public DateTime? CompletedDateTime { get; set; }

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
