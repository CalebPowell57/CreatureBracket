﻿using System;

namespace CreatureBracket.Models
{
    public class Creature : BaseModel
    {
        public Guid BracketId { get; set; }
        public string Name { get; set; }
        public string BIO { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        #endregion
    }
}
