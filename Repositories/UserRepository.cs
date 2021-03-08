using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using System;

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
    }
}
