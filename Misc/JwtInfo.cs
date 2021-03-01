using System;
using System.Security.Claims;

namespace CreatureBracket.Misc
{
    public class JwtInfo
    {
        public Guid? UserId { get { return _userId; } }

        private Guid? _userId;

        public void Configure(ClaimsPrincipal claimsPrincipal)
        {
            var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim is null || userIdClaim.Value is null)
            {
                _userId = null;
            }
            else
            {
                _userId = new Guid(userIdClaim.Value);
            }
        }
    }
}
