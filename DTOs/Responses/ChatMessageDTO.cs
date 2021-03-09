﻿using System;

namespace CreatureBracket.DTOs.Responses
{
    public class ChatMessageDTO
    {
        public Guid ChatMessageId { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
        public Guid UserId { get; set; }
        public DateTime SystemDateTime { get; set; }
    }
}