using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class ChatMessageRepository : ModelRepository<ChatMessage>
    {
        public ChatMessageRepository(DatabaseContext context) : base(context) { }

        public async Task<List<ChatMessageDTO>> GetAllAsync()
        {
            var chatMessageDTOs = new List<ChatMessageDTO>();

            var chatMessages = await _context.ChatMessages.OrderBy(x => x.SystemDateTime).ToListAsync();

            foreach(var chatMessage in chatMessages)
            {
                var userInfo = ADUserInfo.GetByUserName(chatMessage.UserName);

                var chatMessageDTO = new ChatMessageDTO
                {
                    ChatMessageId = chatMessage.Id,
                    Message = chatMessage.Message,
                    SystemDateTime = chatMessage.SystemDateTime,
                    User = $"{userInfo.FirstName} {userInfo.LastName}",
                    UserName = chatMessage.UserName,
                    Image = null
                };

                chatMessageDTOs.Add(chatMessageDTO);
            }

            return chatMessageDTOs;
        }
    }
}
