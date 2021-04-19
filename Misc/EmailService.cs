using CreatureBracket.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace CreatureBracket.Misc
{
    public class EmailService : IHostedService, IDisposable
    {
        private readonly ILogger<EmailService> _logger;
        private Timer _timer;
        private Random _rng = new Random();
        private IServiceScopeFactory _serviceScopeFactory;

        public EmailService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            //_logger.LogInformation("Email Service started.");

            _timer = new Timer(Execute, null, TimeSpan.Zero, TimeSpan.FromSeconds(15));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            //_logger.LogInformation("Email Service stopped.");

            StopTimer();

            return Task.CompletedTask;
        }

        public async void Execute(object state)
        {
            StopTimer();

            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var unitOfWork = scope.ServiceProvider.GetService<UnitOfWork>();

                var activeBracket = await unitOfWork.BracketRepository.ActiveAsync();

                if (activeBracket is null)
                {
                    StartTimer();

                    return;
                }

                var activeRound = await unitOfWork.RoundRepository.ActiveAsync(activeBracket.Id);

                if (activeRound is null)
                {
                    StartTimer();

                    return;
                }

                if (activeRound.VoteDeadline < DateTime.UtcNow.AddHours(2) && !activeRound.EmailReminderSent)
                {
                    activeRound.EmailReminderSent = true;

                    await unitOfWork.SaveAsync();

                    var userBrackets = await unitOfWork.UserBracketRepository.AllActiveAsync(activeBracket.Id);

                    var toEmailAddresses = new List<EmailAddress>();

                    foreach (var userBracket in userBrackets.Where(x => x.UserName.ToLower() == "caleb.powell@fusionmgt.com"))
                    {
                        var settings = await unitOfWork.AccountRepository.GetSettingsAsync(userBracket.UserName);

                        if (settings.VoteDeadline)
                        {
                            var userInfo = ADUserInfo.GetByUserName(userBracket.UserName);

                            toEmailAddresses.Add(new EmailAddress(userBracket.UserName, $"{userInfo.FirstName} {userInfo.LastName}"));
                        }
                    }

                    if (toEmailAddresses.Any())
                    {
                        var emailSender = await EmailSenderAsync(unitOfWork);

                        await emailSender.SendVoteDeadlineReminderAsync(toEmailAddresses, activeRound.Rank, Globals.ApplicationUrl, activeRound.VoteDeadline);
                    }
                }
            }

            StartTimer();
        }

        private async Task<EmailSender> EmailSenderAsync(UnitOfWork unitOfWork)
        {
            var registryItem = await unitOfWork.RegistryRepository.GetByKeyAsync("SendGridAPIKey");

            var emailSender = new EmailSender(registryItem.Value);

            return emailSender;
        }

        private void StartTimer()
        {
            _timer.Change(TimeSpan.FromSeconds(15), TimeSpan.FromSeconds(15));
        }

        private void StopTimer()
        {
            _timer?.Change(Timeout.Infinite, 0);
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
