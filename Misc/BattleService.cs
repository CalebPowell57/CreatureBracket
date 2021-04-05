using CreatureBracket.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CreatureBracket.Misc
{
    public class BattleService : IHostedService, IDisposable
    {
        private readonly ILogger<BattleService> _logger;
        private Timer _timer;
        private Random _rng = new Random();
        private IServiceScopeFactory _serviceScopeFactory;

        public BattleService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            //_logger.LogInformation("Battle Service started.");

            _timer = new Timer(Execute, null, TimeSpan.Zero, TimeSpan.FromSeconds(15));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            //_logger.LogInformation("Battle Service stopped.");

            StopTimer();

            return Task.CompletedTask;
        }

        //move logic to round repo and name BattleAsync()
        public async void Execute(object state)
        {
            StopTimer();

            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var unitOfWork = scope.ServiceProvider.GetService<UnitOfWork>();

                var activeBracket = await unitOfWork.BracketRepository.ActiveAsync();

                if(activeBracket is null)
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

                //use activeRound.VotingDeadline
                if (activeRound.VoteDeadline < DateTime.UtcNow)
                {
                    foreach (var matchup in activeRound.Matchups)
                    {
                        var creature1Armies = matchup.Votes.Where(x => x.CreatureId == matchup.Creature1Id).Count() + 1;//add one in case of creature1 having no votes
                        var creature2Armies = matchup.Votes.Where(x => x.CreatureId == matchup.Creature2Id).Count() + 1;//add one in case of creature2 having no votes

                        var underdog = GetUnderdog(matchup);

                        var winnerDetermined = false;

                        while (!winnerDetermined)
                        {
                            var armyTaken = false;

                            while (!armyTaken)
                            {
                                var creature1Roll = _rng.Next(1, 11);//10 sided die roll
                                var creature2Roll = _rng.Next(1, 11);//10 sided die roll

                                if (creature1Roll > creature2Roll)
                                {
                                    creature2Armies--;
                                    armyTaken = true;
                                }
                                else if (creature2Roll > creature1Roll)
                                {
                                    creature1Armies--;
                                    armyTaken = true;
                                }
                                else
                                {
                                    if (underdog == matchup.Creature1)
                                    {
                                        creature2Armies--;
                                        armyTaken = true;
                                    }
                                    else if (underdog == matchup.Creature2)
                                    {
                                        creature1Armies--;
                                        armyTaken = true;
                                    }
                                }
                            }

                            if (creature1Armies <= 0)
                            {
                                matchup.LoserId = matchup.Creature1Id;
                                matchup.Loser = matchup.Creature1;
                                matchup.WinnerId = matchup.Creature2Id;
                                matchup.Winner = matchup.Creature2;
                                winnerDetermined = true;
                            }
                            else if (creature2Armies <= 0)
                            {
                                matchup.LoserId = matchup.Creature2Id;
                                matchup.Loser = matchup.Creature2;
                                matchup.WinnerId = matchup.Creature1Id;
                                matchup.Winner = matchup.Creature1;
                                winnerDetermined = true;
                            }
                        }
                    }

                    if (activeRound.Matchups.Count > 1)
                    {
                        await unitOfWork.BracketRepository.CreateNewRoundAsync(activeRound);
                    }
                    else
                    {
                        //do finale logic
                    }

                    //await unitOfWork.UserBracketRepository.UpdatePointsAsync();

                    await unitOfWork.SaveAsync();
                }
            }
            
            StartTimer();
        }

        private Creature GetUnderdog(Matchup matchup)
        {
            double totalVotes = matchup.Votes.Count;
            var differentialCap = Math.Ceiling(totalVotes / 7);//round up the total votes divided by seven to get the differential cap in which an underdog is determined if the differential between votes is equal to or less than the differential cap, there is no underdog
            var creature1VoteCount = matchup.Votes.Where(x => x.CreatureId == matchup.Creature1Id).Count();
            var creature2VoteCount = matchup.Votes.Where(x => x.CreatureId == matchup.Creature2Id).Count();
            var differential = Math.Abs(creature1VoteCount - creature2VoteCount);

            Creature underdog;

            if (creature1VoteCount > creature2VoteCount && differential > differentialCap)
            {
                underdog = matchup.Creature2;
            }
            else if (creature2VoteCount > creature1VoteCount && differential > differentialCap)
            {
                underdog = matchup.Creature1;
            }
            else
            {
                underdog = null;
            }

            return underdog;
        }

        private void StartTimer()
        {
            _timer.Change(TimeSpan.Zero, TimeSpan.FromSeconds(5));
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
