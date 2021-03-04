using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using System;

namespace CreatureBracket.Repositories
{
    public class UserRepository : ModelRepository<User>
    {
        public UserRepository(DatabaseContext context) : base(context) { }

        public void Register(RegisterRequestDTO dto)
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
                UserName = dto.UserName
            };

            _context.Users.Add(user);
        }
    }
}
