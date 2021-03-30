using System;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Exceptions
{
    public class ExpectedException : Exception
    {
        public EErrorSeverityLevel SeverityLevel { get; private set; }

        public ExpectedException (string message, EErrorSeverityLevel severityLevel = EErrorSeverityLevel.High) : base(message)
        {
            SeverityLevel = severityLevel;
        }
    }
}
