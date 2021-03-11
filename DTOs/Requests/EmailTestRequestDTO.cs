namespace CreatureBracket.DTOs.Requests
{
    public class EmailTestRequestDTO
    {
        public string EmailAddress { get; set; }
        public string ToName { get; set; }
        public string SendGridApiKey { get; set; }
    }
}
