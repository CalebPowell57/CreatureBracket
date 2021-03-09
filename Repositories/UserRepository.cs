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

        public Guid Register(RegisterRequestDTO dto)
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

            var verifyGuid = Guid.NewGuid();

            var userVerifyRequest = new UserVerifyRequest
            {
                Hash = Security.Hash(verifyGuid.ToString()),
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Completed = false,
                ExpirationDateTime = DateTime.UtcNow.AddDays(2)
            };

            _context.Users.Add(user);
            _context.UserVerifyRequests.Add(userVerifyRequest);

            return verifyGuid;
        }

        public async Task<bool> VerifyAsync(VerifyRequestDTO dto)
        {
            var userVerifyRequest = await _context.UserVerifyRequests.SingleOrDefaultAsync(x => x.Hash == Security.Hash(dto.VerifyGuid.ToString()) && x.User.EmailAddress.ToLower() == dto.EmailAddress.ToLower());

            if (userVerifyRequest is null)
            {
                throw new Exception($"No {dto.EmailAddress} user found!");
            }
            else if (userVerifyRequest.ExpirationDateTime < DateTime.UtcNow)
            {
                throw new Exception($"The registration request for {dto.EmailAddress} has expired!");
            }
            else if (userVerifyRequest.User.Verified)
            {
                throw new Exception($"{dto.EmailAddress} has already been verified!");
            }
            else
            {
                userVerifyRequest.Completed = true;
                userVerifyRequest.User.Verified = true;
            }

            return true;
        }
    }
}
