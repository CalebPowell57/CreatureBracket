using CreatureBracket.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CreatureBracket.Misc
{
    public class BattleService : IHostedService, IDisposable
    {
        private readonly ILogger<BattleService> _logger;
        private UnitOfWork _unitOfWork;
        private Timer _timer;
        private IServiceScope _scope;
        private Random _rng = new Random();

        //remove
        private DateTime _votingDeadline = DateTime.UtcNow.AddSeconds(15);
        //remove

        public BattleService(IServiceScopeFactory serviceScopeFactory)
        {
            _scope = serviceScopeFactory.CreateScope();
            var unitOfWork = _scope.ServiceProvider.GetService<UnitOfWork>();

            _unitOfWork = unitOfWork;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            //_logger.LogInformation("Battle Service started.");

            _timer = new Timer(Execute, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));

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

            var activeBracket = await _unitOfWork.BracketRepository.ActiveAsync();
            var activeRound = await _unitOfWork.RoundRepository.ActiveAsync(activeBracket.Id);

            //use activeRound.VotingDeadline
            if(_votingDeadline < DateTime.UtcNow && !activeRound.Completed)
            {
                foreach (var matchup in activeRound.Matchups)
                {
                    var creature1Armies = matchup.Creature1Votes + 1;//add one in case of creature1 having no votes
                    var creature2Armies = matchup.Creature2Votes + 1;//add one in case of creature2 having no votes

                    var underdog = GetUnderdog(matchup);

                    var winnerDetermined = false;

                    while(!winnerDetermined)
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

                        if(creature1Armies <= 0)
                        {
                            matchup.LoserId = matchup.Creature1Id;
                            matchup.WinnerId = matchup.Creature2Id;
                            winnerDetermined = true;
                        }
                        else if (creature2Armies <= 0)
                        {
                            matchup.LoserId = matchup.Creature2Id;
                            matchup.WinnerId = matchup.Creature1Id;
                            winnerDetermined = true;
                        }
                    }
                }

                activeRound.Completed = true;
                await _unitOfWork.SaveAsync();
            }

            StartTimer();
        }

        private Creature GetUnderdog(Matchup matchup)
        {
            double totalVotes = matchup.Creature1Votes + matchup.Creature2Votes;
            var differentialCap = Math.Ceiling(totalVotes / 7);//round up the total votes divided by seven to get the differential cap in which an underdog is determined if the differential between votes is equal to or less than the differential cap, there is no underdog
            var differential = Math.Abs(matchup.Creature1Votes - matchup.Creature2Votes);

            Creature underdog;

            if (matchup.Creature1Votes > matchup.Creature2Votes && differential > differentialCap)
            {
                underdog = matchup.Creature2;
            }
            else if (matchup.Creature2Votes > matchup.Creature1Votes && differential > differentialCap)
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
            _scope?.Dispose();
        }
    }
}
