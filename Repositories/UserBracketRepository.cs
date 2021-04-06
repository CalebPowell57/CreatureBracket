using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class UserBracketRepository : ModelRepository<UserBracket>
    {
        public UserBracketRepository(DatabaseContext context) : base(context) { }

        public async Task<UserBracketResponseDTO> MyBracketAsync(string userName, Guid activeBracketId)
        {
            var userBracket = await _context.UserBrackets.Include(x => x.Rounds)
                                                            .ThenInclude(x => x.Matchups)
                                                                .ThenInclude(x => x.Creature1)
                                                         .Include(x => x.Rounds)
                                                            .ThenInclude(x => x.Matchups)
                                                                .ThenInclude(x => x.Creature2)
                                                         .SingleOrDefaultAsync(x => x.UserName == userName);

            var bracket = new UserBracketResponseDTO
            {
                Rounds = new List<UserRoundResponseDTO>(),
                UserName = userName
            };

            if (userBracket is null)
            {
                var creatures = await _context.Creatures.Where(x => x.BracketId == activeBracketId).ToListAsync();

                var roundRank = 1;
                var currentRoundMatchupCount = creatures.Count / 2;

                while (true)
                {
                    var round = new UserRoundResponseDTO
                    {
                        Rank = roundRank,
                        Matchups = new List<UserMatchupResponseDTO>()
                    };

                    for (int ix = 0; ix < currentRoundMatchupCount; ix++)
                    {
                        var matchup = new UserMatchupResponseDTO
                        {
                            Creature1 = null,
                            Creature2 = null,
                            MatchupSeed = ix,
                            RoundRank = roundRank,
                            Unset = true,
                            MatchupId = Guid.NewGuid()
                        };

                        if (roundRank <= 1)
                        {
                            var creature1 = creatures.Single(x => x.Seed == (ix * 2));
                            var creature2 = creatures.Single(x => x.Seed == (ix * 2) + 1);

                            matchup.Creature1 = new UserCreatureResponseDTO
                            {
                                BIO = creature1.BIO,
                                CreatureId = creature1.Id,
                                Image = creature1.Image,
                                Name = creature1.Name,
                                Winner = false
                            };

                            matchup.Creature2 = new UserCreatureResponseDTO
                            {
                                BIO = creature2.BIO,
                                CreatureId = creature2.Id,
                                Image = creature2.Image,
                                Name = creature2.Name,
                                Winner = false
                            };
                        }

                        round.Matchups.Add(matchup);
                    }

                    bracket.Rounds.Add(round);

                    if (currentRoundMatchupCount == 1)
                    {
                        break;
                    }

                    currentRoundMatchupCount = currentRoundMatchupCount / 2;
                    roundRank++;
                }
            }
            else
            {
                foreach (var round in userBracket.Rounds.OrderBy(x => x.Rank).ToList())
                {
                    var roundDTO = new UserRoundResponseDTO
                    {
                        Matchups = new List<UserMatchupResponseDTO>(),
                        Rank = round.Rank
                    };

                    foreach (var matchup in round.Matchups.OrderBy(x => x.Seed).ToList())
                    {
                        var matchupDTO = new UserMatchupResponseDTO
                        {
                            Creature1 = matchup.Creature1 is null ? null : new UserCreatureResponseDTO
                            {
                                BIO = matchup.Creature1.BIO,
                                CreatureId = matchup.Creature1.Id,
                                Image = matchup.Creature1.Image,
                                Name = matchup.Creature1.Name,
                                Winner = matchup.Creature1Id == matchup.WinnerId
                            },
                            Creature2 = matchup.Creature2 is null ? null : new UserCreatureResponseDTO
                            {
                                BIO = matchup.Creature2.BIO,
                                CreatureId = matchup.Creature2.Id,
                                Image = matchup.Creature2.Image,
                                Name = matchup.Creature2.Name,
                                Winner = matchup.Creature2Id == matchup.WinnerId
                            },
                            Unset = matchup.Creature1 is null || matchup.Creature2 is null || !matchup.WinnerId.HasValue,
                            MatchupSeed = matchup.Seed,
                            RoundRank = round.Rank,
                            MatchupId = matchup.Id
                        };

                        roundDTO.Matchups.Add(matchupDTO);
                    }

                    bracket.Rounds.Add(roundDTO);
                }
            }

            return bracket;
        }

        public async Task UpdatePointsAsync(Guid bracketId, Round round)
        {
            var userBrackets = await _context.UserBrackets.Include(x => x.Rounds)
                                                            .ThenInclude(x => x.Matchups)
                                                          .Where(x => x.BracketId == bracketId)
                                                          .ToListAsync();

            foreach (var userBracket in userBrackets)
            {
                var userRound = userBracket.Rounds.Single(x => x.Rank == round.Rank);

                var userMatchups = userRound.Matchups.OrderBy(x => x.Seed).ToList();

                foreach (var matchup in userMatchups)
                {
                    userBracket.Points += matchup.WinnerId == round.Matchups.OrderBy(x => x.SystemDateTime)
                                                                            .ToList()[userMatchups.IndexOf(matchup)].WinnerId ?
                                                                                                                                //2 to the round ranks power (1 indexed, not 0 based) minus 1, times 10 gets us the pattern: {10, 20, 40, 80, 160, 320 etc...}
                                                                                                                                (int)Math.Pow(2, round.Rank - 1) * 10 :
                                                                                                                                0;
                }
            }
        }

        public async Task<UserBracket> ExistingUserBracket(Guid activeBracketId, string userName)
        {
            var userBracket = await _context.UserBrackets.Include(x => x.Rounds)
                                                            .ThenInclude(x => x.Matchups)
                                                                .ThenInclude(x => x.Creature1)
                                                         .Include(x => x.Rounds)
                                                            .ThenInclude(x => x.Matchups)
                                                                .ThenInclude(x => x.Creature2)
                                                         .SingleOrDefaultAsync(x => x.UserName == userName && x.BracketId == activeBracketId);

            if (userBracket != null)
            {
                userBracket.Rounds = userBracket.Rounds.OrderBy(x => x.Rank).ToList();
                userBracket.Rounds.ForEach(x => x.Matchups = x.Matchups.OrderBy(y => y.Seed).ToList());
            }

            return userBracket;
        }

        public void AddUserBracketFromDTO(UserBracketResponseDTO dto, Guid activeBracketId)
        {
            var userBracket = new UserBracket
            {
                Id = Guid.NewGuid(),
                BracketId = activeBracketId,
                UserName = dto.UserName,
                Rounds = new List<UserRound>(),
                Points = 0
            };

            foreach (var roundDTO in dto.Rounds)
            {
                var userRound = new UserRound
                {
                    UserBracketId = userBracket.Id,
                    Id = Guid.NewGuid(),
                    Rank = roundDTO.Rank,
                    Matchups = new List<UserMatchup>()
                };

                foreach (var matchupDTO in roundDTO.Matchups)
                {
                    Guid? winnerId = null;

                    if (matchupDTO.Creature1 != null && matchupDTO.Creature1.Winner)
                    {
                        winnerId = matchupDTO.Creature1.CreatureId;
                    }
                    else if (matchupDTO.Creature2 != null && matchupDTO.Creature2.Winner)
                    {
                        winnerId = matchupDTO.Creature2.CreatureId;
                    }

                    var userMatchup = new UserMatchup
                    {
                        Creature1Id = matchupDTO.Creature1?.CreatureId,
                        Creature2Id = matchupDTO.Creature2?.CreatureId,
                        Id = Guid.NewGuid(),
                        WinnerId = winnerId,
                        UserRoundId = userRound.Id,
                        Seed = matchupDTO.MatchupSeed
                    };

                    userRound.Matchups.Add(userMatchup);
                }

                userBracket.Rounds.Add(userRound);
            }

            _context.UserBrackets.Add(userBracket);
        }

        public async Task UpdateMatchupsAsync(UserBracketResponseDTO dto, Guid userBracketId)
        {
            var matchups = await _context.UserMatchups.Where(x => x.Round.UserBracketId == userBracketId).ToListAsync();

            foreach (var roundDTO in dto.Rounds)
            {
                foreach (var matchupDTO in roundDTO.Matchups)
                {
                    Guid? winnerId = null;

                    if (matchupDTO.Creature1 != null && matchupDTO.Creature1.Winner)
                    {
                        winnerId = matchupDTO.Creature1.CreatureId;
                    }
                    else if (matchupDTO.Creature2 != null && matchupDTO.Creature2.Winner)
                    {
                        winnerId = matchupDTO.Creature2.CreatureId;
                    }

                    var matchup = matchups.Single(x => x.Round.Rank == matchupDTO.RoundRank && x.Seed == matchupDTO.MatchupSeed);

                    if (matchupDTO.Creature1 != null)
                    {
                        try
                        {
                            var creature = await _context.Creatures.SingleAsync(x => x.Id == matchupDTO.Creature1.CreatureId);
                        }
                        catch (Exception e)
                        {
                            var b = e;
                        }
                    }

                    if (matchupDTO.Creature2 != null)
                    {
                        try
                        {
                            var creature = await _context.Creatures.SingleAsync(x => x.Id == matchupDTO.Creature2.CreatureId);
                        }
                        catch (Exception e)
                        {
                            var b = e;
                        }
                    }

                    matchups.Single(x => x.Round.Rank == matchupDTO.RoundRank && x.Seed == matchupDTO.MatchupSeed).Creature1Id = matchupDTO.Creature1 is null ? (Guid?)null : Guid.Parse(matchupDTO.Creature1?.CreatureId.ToString().ToUpper());
                    matchups.Single(x => x.Round.Rank == matchupDTO.RoundRank && x.Seed == matchupDTO.MatchupSeed).Creature2Id = matchupDTO.Creature2 is null ? (Guid?)null : Guid.Parse(matchupDTO.Creature2?.CreatureId.ToString().ToUpper());
                    matchup.WinnerId = winnerId is null ? (Guid?)null : Guid.Parse(winnerId?.ToString().ToUpper());
                }
            }
        }
    }
}
