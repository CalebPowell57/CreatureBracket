using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.IO;
using System.Threading.Tasks;

namespace CreatureBracket.Misc
{
    public class EmailService
    {
        private readonly string _apiKey = "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";
        private readonly EmailAddress _sender = new EmailAddress("cpowell@kalos-inc.com", "Creature Bracket");

        public async Task<Response> SendTestAsync(string emailAddress, string toName)
        {
            var client = new SendGridClient(_apiKey);
            var subject = "This is a test";
            var to = new EmailAddress(emailAddress, toName);
            var msg = MailHelper.CreateSingleEmail(_sender, to, subject, "Test message.", "");
            var response = await client.SendEmailAsync(msg);

            return response;
        }

        public async Task<Response> SendConfirmationRequestAsync(string emailAddress, string toName, Guid verifyGuid)
        {
            var client = new SendGridClient(_apiKey);
            var subject = "Please verify your Creature Bracket account";
            var to = new EmailAddress(emailAddress, toName);
            var htmlContent = GetConfirmationRequestContent(emailAddress, verifyGuid);
            var msg = MailHelper.CreateSingleEmail(_sender, to, subject, "", htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }

        private string GetConfirmationRequestContent(string emailAddress, Guid verifyGuid)
        {
            var body = File.ReadAllText("ConfirmationRequestBody.html");

            body.Replace("{{emailAddress}}", emailAddress);
            body.Replace("{{verifyId}}", verifyGuid.ToString());

            return body;
        }
    }
}
