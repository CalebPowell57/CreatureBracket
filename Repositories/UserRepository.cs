using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class UserRepository : ModelRepository<User>
    {
        public UserRepository(DatabaseContext context) : base(context) { }

        public string Register(RegisterRequestDTO dto)
        {
            if(dto.Password1 != dto.Password2)
            {
                throw new Exception("Passwords don't match!");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Password = Security.Hash(dto.Password1),
                Type = Constants.EUserType.Normal,
                EmailAddress = dto.EmailAddress
            };

            var key = Guid.NewGuid().ToString().Replace("-", "");

            var userVerifyRequest = new UserVerifyRequest
            {
                Key = Security.Hash(key),
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Completed = false,
                ExpirationDateTime = DateTime.UtcNow.AddDays(2)
            };

            _context.Users.Add(user);
            _context.UserVerifyRequests.Add(userVerifyRequest);

            return key;
        }

        public async Task VerifyAsync(VerifyRequestDTO dto)
        {
            var userVerifyRequest = await _context.UserVerifyRequests.SingleOrDefaultAsync(x => x.Key == Security.Hash(dto.Key.ToString()));

            if (userVerifyRequest is null)
            {
                throw new Exception($"No user found!");
            }
            else if (userVerifyRequest.ExpirationDateTime < DateTime.UtcNow)
            {
                throw new Exception($"The registration request key has expired!");
            }
            else if (userVerifyRequest.User.Verified)
            {
                throw new Exception($"This user has already been verified!");
            }
            else
            {
                userVerifyRequest.Completed = true;
                userVerifyRequest.User.Verified = true;
            }
        }
    }
}
