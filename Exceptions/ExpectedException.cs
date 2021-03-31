using Newtonsoft.Json;
using System;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Exceptions
{
    public class ExpectedException : Exception
    {
        public ExpectedException (string message, EErrorSeverityLevel severityLevel = EErrorSeverityLevel.Low) : base(MessageToErrorInformationMessage(message, severityLevel)) {}

        private static string MessageToErrorInformationMessage (string message, EErrorSeverityLevel severityLevel)
        {
            var errorInformation = new ErrorInformation
            {
                Message = message,
                SeverityLevel = severityLevel,
                Title = "Error"
            };

            var errorInformationString = JsonConvert.SerializeObject(errorInformation);

            return errorInformationString;
        }
    }
}
