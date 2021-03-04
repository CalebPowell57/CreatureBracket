using System;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Models
{
    public class CreatureSubmission : BaseModel
    {
        public Guid BracketId { get; set; }
        public string Name { get; set; }
        public string BIO { get; set; }
        public DateTime EntryDate { get; set; }
        public ECreatureSubmissionStatus Status { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        #endregion
    }
}
