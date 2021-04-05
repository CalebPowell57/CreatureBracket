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

        public async Task SendMessage(string message, string userName)
        {
            var chatMessage = new ChatMessage
            {
                Id = Guid.NewGuid(),
                Message = message,
                SystemDateTime = DateTime.UtcNow,
                UserName = userName
            };

            await _unitOfWork.ChatMessageRepository.PostAsync(chatMessage);
            await _unitOfWork.SaveAsync();

            var dto = new ChatMessageDTO
            {
                ChatMessageId = chatMessage.Id,
                Message = chatMessage.Message,
                User = "Test Test",//$"{user.FirstName} {user.LastName}",//we need to store user info or something
                UserName = userName,
                SystemDateTime = chatMessage.SystemDateTime
            };

            await Clients.All.SendAsync("ReceiveMessage", dto);
        }
    }
}
