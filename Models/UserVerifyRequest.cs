﻿using System;

namespace CreatureBracket.Models
{
    public class UserVerifyRequest : BaseModel
    {
        public Guid UserId { get; set; }
        public string Key { get; set; }
        public bool Completed { get; set; }
        public DateTime ExpirationDateTime { get; set; }

        #region navigation properties
        public User User { get; set; }
        #endregion
    }
}