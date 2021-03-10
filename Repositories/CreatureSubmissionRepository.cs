using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Repositories
{
    public class CreatureSubmissionRepository : ModelRepository<CreatureSubmission>
    {
        public CreatureSubmissionRepository(DatabaseContext context) : base(context) { }

        public CreatureSubmission Post(CreatureSubmissionRequestDTO dto, Guid bracketId)
        {
            var creatureSubmission = new CreatureSubmission
            {
                Id = Guid.NewGuid(),
                BIO = dto.BIO,
                BracketId = bracketId,
                EntryDate = DateTime.UtcNow,
                Name = dto.Name,
                Image = dto.Image
            };

            _context.CreatureSubmissions.Add(creatureSubmission);

            return creatureSubmission;
        }

        public async Task<bool> ApproveAsync(ApproveSubmissionRequestDTO dto)
        {
            var submission = await _context.CreatureSubmissions.SingleAsync(x => x.Id == dto.CreatureSubmissionId);

            var creatures = await _context.Creatures.Where(x => x.BracketId == submission.BracketId).ToListAsync();

            if(creatures.Count >= 16)
            {
                throw new Exception("There are already 16 creatures approved for battle!");
            }

            var creature = new Creature
            {
                BIO = submission.BIO,
                Id = Guid.NewGuid(),
                BracketId = submission.BracketId,
                Name = submission.Name,
                Image = submission.Image,
                Seed = null
            };

            submission.Status = ECreatureSubmissionStatus.Approved;

            _context.Add(creature);

            return creatures.Count == 15;//this is the last creature. write code that's more readable
        }

        public async Task<List<CreatureSubmission>> ByStatusAsync(ECreatureSubmissionStatus status)
        {
            var submissions = await _context.CreatureSubmissions.AsNoTracking()
                                                                .Where(x => x.Status == status)
                                                                .ToListAsync();

            return submissions;
        }
    }
}
