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

        public async Task<UserBracketResponseDTO> MyBracketAsync(Guid userId, Guid activeBracketId)
        {
            var userBracket = await _context.UserBrackets.SingleOrDefaultAsync(x => x.UserId == userId);

            var bracket = new UserBracketResponseDTO
            {
                Rounds = new List<UserRoundResponseDTO>()
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

                    for(int ix = 0; ix < currentRoundMatchupCount; ix++)
                    {
                        var matchup = new UserMatchupResponseDTO
                        {
                            Creature1 = null,
                            Creature2 = null,
                            MatchupSeed = ix,
                            RoundRank = roundRank,
                            Unset = false
                        };

                        if(roundRank <= 1)
                        {
                            var creature1 = creatures.Single(x => x.Seed == (ix * 2));
                            var creature2 = creatures.Single(x => x.Seed == (ix * 2) + 1);

                            matchup.Creature1 = new UserCreatureResponseDTO
                            {
                                BIO = creature1.BIO,
                                CreatureId = creature1.Id,
                                Image = creature1.Image,
                                Name = creature1.Name,
                                Unset = false,
                                Winner = false
                            };

                            matchup.Creature2 = new UserCreatureResponseDTO
                            {
                                BIO = creature2.BIO,
                                CreatureId = creature2.Id,
                                Image = creature2.Image,
                                Name = creature2.Name,
                                Unset = false,
                                Winner = false
                            };
                        }

                        round.Matchups.Add(matchup);
                    }

                    bracket.Rounds.Add(round);

                    if(currentRoundMatchupCount == 1)
                    {
                        break;
                    }

                    currentRoundMatchupCount = currentRoundMatchupCount / 2;
                    roundRank++;
                }
            }
            else
            {
                //load the saved bracket
            }

            return bracket;
        }
    }
}
