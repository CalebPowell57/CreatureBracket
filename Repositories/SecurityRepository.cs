using CreatureBracket.DTOs.Requests;
using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class SecurityRepository : BaseRepository
    {
        public SecurityRepository(DatabaseContext context) : base(context) { }

        public async Task<bool> VerifyAsync(VerifyRequestDTO dto)
        {
            var userVerifyRequest = await _context.UserVerifyRequests.SingleOrDefaultAsync(x => x.Hash == Security.Hash(dto.Hash.ToString()) && x.User.EmailAddress.ToLower() == dto.EmailAddress.ToLower());

            if(userVerifyRequest is null)
            {
                throw new Exception($"No {dto.EmailAddress} user found!");
            }
            else if (userVerifyRequest.ExpirationDateTime < DateTime.UtcNow)
            {
                throw new Exception($"The registration request for {dto.EmailAddress} has expired!");
            }
            else if(userVerifyRequest.User.Verified)
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

        public async Task<AuthenticationResponseDTO> AuthenticateAsync(AuthenticationRequestDTO requestDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.EmailAddress.ToUpper() == requestDTO.UserName.ToUpper());

            if (user is null || !Security.Validate(user.Password, requestDTO.Password))
            {
                throw new Exception("Invalid username or password.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(Constants.AuthTypeClaim, Constants.AuthTypeUserCredentials)
            };

            //need to log what time they accessed the system

            var response = new AuthenticationResponseDTO()
            {
                LastName = user.LastName,
                FirstName = user.FirstName,
                UserId = user.Id,
                JWT = GetToken(claims, Constants.JwtLocalAudience)
            };

            return response;
        }

        private string GetToken(Claim[] claims, string audience)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.SecurityKey));//put this security key in the appsettings.json file
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Constants.SecurityIssuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
