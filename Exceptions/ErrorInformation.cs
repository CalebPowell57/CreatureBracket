using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Exceptions
{
    public class ErrorInformation
    {
        public EErrorSeverityLevel SeverityLevel { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
    }
}
