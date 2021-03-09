using CreatureBracket.DTOs.Responses;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Repositories
{
    public class BracketRepository : ModelRepository<Bracket>
    {
        public BracketRepository(DatabaseContext context) : base(context) { }

        public async Task<Bracket> ActiveAsync()
        {
            if (!await _context.Brackets.AnyAsync())
            {
                return null;
            }

            var activeBracket = await _context.Brackets.AsNoTracking().OrderBy(x => x.CreatureEntryDeadline).Take(1).SingleAsync();

            return activeBracket;
        }

        public async Task<List<StandingsItemDTO>> StandingsAsync()
        {
            if (!await _context.Brackets.AnyAsync())
            {
                return null;
            }

            var activeBracket = await ActiveAsync();

            var standings = new List<StandingsItemDTO>();

            var userBrackets = await _context.UserBrackets.Include(x => x.User).Where(x => x.BracketId == activeBracket.Id).ToListAsync();

            foreach (var userBracket in userBrackets)
            {
                var standingItem = new StandingsItemDTO
                {
                    FirstName = userBracket.User.FirstName,
                    LastName = userBracket.User.LastName,
                    Points = 0,
                    Rank = 1
                };

                standings.Add(standingItem);
            }

            return standings;
        }

        public BracketResponseDTO BracketTestData()
        {
            var bracket = new BracketResponseDTO
            {
                Rounds = GlobalTestData()
            };

            return bracket;

        }
        public List<RoundResponseDTO> GlobalTestData()
        {
            var rounds = new List<RoundResponseDTO>();

            var round1 = GenerateTestRound(32);
            var round2 = GenerateTestRound(16);
            var round3 = GenerateTestRound(8);
            var round4 = GenerateTestRound(4);
            var round5 = GenerateTestRound(2);
            var round6 = GenerateTestRound(1);

            rounds.Add(round1);
            rounds.Add(round2);
            rounds.Add(round3);
            rounds.Add(round4);
            rounds.Add(round5);
            rounds.Add(round6);

            return rounds;
        }

        private RoundResponseDTO GenerateTestRound(int matchupCount)
        {
            var round = new RoundResponseDTO
            {
                Matchups = new List<MatchupResponseDTO>()
            };

            var creatureIndex = 1;

            for (int ix = 0; ix < matchupCount; ix++)
            {
                var matchup = new MatchupResponseDTO
                {
                    Contestants = new List<CreatureResponseDTO>
                    {
                        new CreatureResponseDTO
                        {
                            Name = $"Creature {creatureIndex}",
                            BIO = $"This is Creature {creatureIndex}'s bio!"
                        },
                        new CreatureResponseDTO
                        {
                            Name = $"Creature {creatureIndex + 1}",
                            BIO = $"This is Creature {creatureIndex + 1}'s bio!"
                        }
                    }
                };

                creatureIndex += 2;

                round.Matchups.Add(matchup);
            }

            return round;
        }
    }
}
