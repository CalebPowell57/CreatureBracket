using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CreatureBracket.Misc
{
    public class EmailSender
    {
        private readonly EmailAddress _sender = new EmailAddress("cpowell@kalos-inc.com", "Creature Bracket");
        private readonly string _sendGridAPIKey;

        public EmailSender(string sendGridAPIKey)
        {
            _sendGridAPIKey = sendGridAPIKey;
        }

        public async Task<Response> SendTestAsync(string emailAddress, string toName)
        {
            var client = new SendGridClient(_sendGridAPIKey);
            var subject = "This is a test";
            var to = new EmailAddress(emailAddress, toName);
            var msg = MailHelper.CreateSingleEmail(_sender, to, subject, "Test message.", "");
            var response = await client.SendEmailAsync(msg);

            return response;
        }

        public async Task<Response> SendVoteDeadlineReminderAsync(List<EmailAddress> toEmailAddresses, int roundRank, string appRoute, DateTime voteDeadline)
        {
            var client = new SendGridClient(_sendGridAPIKey);
            var subject = "Don't forget to cast your votes!";
            var htmlContent = GetVoteDeadlineReminderContent(appRoute, roundRank, voteDeadline);
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(_sender, toEmailAddresses, subject, "", htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }

        private string GetVoteDeadlineReminderContent(string appRoute, int roundRank, DateTime voteDeadline)
        {
            var body = File.ReadAllText("EmailTemplates/VoteDeadlineReminderBody.html");

            body = body.Replace("{{app-route}}", appRoute)
                       .Replace("{{round-rank}}", roundRank.ToString())
                       .Replace("{{vote-deadline}}", $"{voteDeadline.ToShortDateString()} at {voteDeadline.ToShortTimeString()}");

            return body;
        }
    }
}
