using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class ChatMessageRepository : ModelRepository<ChatMessage>
    {
        public ChatMessageRepository(DatabaseContext context) : base(context) { }

        public async Task<List<ChatMessageDTO>> GetAllAsync()
        {
            var chatMessageDTOs = new List<ChatMessageDTO>();

            var chatMessages = await _context.ChatMessages.ToListAsync();

            foreach(var chatMessage in chatMessages)
            {
                var chatMessageDTO = new ChatMessageDTO
                {
                    ChatMessageId = chatMessage.Id,
                    Message = chatMessage.Message,
                    SystemDateTime = chatMessage.SystemDateTime,
                    User = "Test Test",//$"{chatMessage.User.FirstName} {chatMessage.User.LastName}",//we need to store user info somehow
                    UserName = chatMessage.UserName
                };

                chatMessageDTOs.Add(chatMessageDTO);
            }

            return chatMessageDTOs;
        }
    }
}
