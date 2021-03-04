using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CreatureBracket.Misc
{
    public static class Constants
    {
        public enum ERoundType { Championship, FinalFour, EliteEight, SweetSixteen, RoundOfThirtyTwo }
        public enum EUserType { Super, Normal }
        public enum ECreatureSubmissionStatus { Pending, Approved }

        public const string JwtLocalAudience = "Creature Bracket Local";//change to whatever my app is called
        public static readonly ReadOnlyCollection<string> JwtAudiences = new ReadOnlyCollection<string>(new List<string> { JwtLocalAudience });

        public const string AuthTypeClaim = "AuthType";

        public const string AuthPolicyUserCredentials = "8f61619d-7722-4e00-adfe-709a8bae1eea";
        public const string AuthTypeUserCredentials = "ee408dd6-52be-4b7f-9a10-86c153ebd331";

        public const string SecurityKey = "44e35784-c895-4cdf-b4b8-1714d09d37b6";//put in appsettings.json
        public const string SecurityIssuer = "Creature Bracket API";//put in appsettings.json
    }
}
