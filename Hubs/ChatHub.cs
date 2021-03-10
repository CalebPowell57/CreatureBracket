using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace CreatureBracket.Hubs
{
    public class ChatHub : Hub
    {
        private readonly UnitOfWork _unitOfWork;

        public ChatHub(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task SendMessage(string message, Guid userId)
        {
            var user = await _unitOfWork.UserRepository.GetAsync(userId);

            var chatMessage = new ChatMessage
            {
                Id = Guid.NewGuid(),
                Message = message,
                SystemDateTime = DateTime.UtcNow,
                UserId = userId
            };

            await _unitOfWork.ChatMessageRepository.PostAsync(chatMessage);
            await _unitOfWork.SaveAsync();

            var dto = new ChatMessageDTO
            {
                ChatMessageId = chatMessage.Id,
                Message = chatMessage.Message,
                User = $"{user.FirstName} {user.LastName}",
                UserId = userId,
                SystemDateTime = chatMessage.SystemDateTime
            };

            await Clients.All.SendAsync("ReceiveMessage", dto);
        }
    }
}
