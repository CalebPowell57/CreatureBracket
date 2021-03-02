using CreatureBracket.DTOs.Requests;
using CreatureBracket.Misc;
using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

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
                Name = dto.Name
            };

            _context.CreatureSubmissions.Add(creatureSubmission);

            return creatureSubmission;
        }

        public async Task ApproveAsync(Guid submissionId)
        {
            var submission = await _context.CreatureSubmissions.SingleAsync(x => x.Id == submissionId);

            var creature = new Creature
            {
                BIO = submission.BIO,
                Id = Guid.NewGuid(),
                BracketId = submission.BracketId,
                Name = submission.Name
            };

            _context.Add(creature);
        }
    }
}
