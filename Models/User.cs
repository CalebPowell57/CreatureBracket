﻿using System.Collections.Generic;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Models
{
    public class User : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public EUserType Type { get; set; }

        #region navigation properties
        public List<UserBracket> Brackets { get; set; }
        #endregion
    }
}
