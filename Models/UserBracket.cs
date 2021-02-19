using System;
using System.Collections.Generic;

namespace CreatureBracket.Models
{
    public class UserBracket : BaseModel
    {
        public Guid UserId { get; set; }//or some active directory identifier

        #region navigation properties
        public User User { get; set; }
        public List<UserRound> Rounds { get; set; }
        #endregion
    }
}
