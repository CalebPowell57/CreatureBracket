﻿using System;

namespace CreatureBracket.Models
{
    public class Creature : BaseModel
    {
        public Guid BracketId { get; set; }
        public string Name { get; set; }
        public string BIO { get; set; }
        public string Image { get; set; }
        public int? Seed { get; set; }

        #region navigation properties
        public Bracket Bracket { get; set; }
        #endregion
    }
}
