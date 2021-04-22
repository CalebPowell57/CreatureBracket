using CreatureBracket.DTOs.Requests;
using CreatureBracket.Exceptions;
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

        public async Task ApproveAsync(ApproveSubmissionRequestDTO dto)
        {
            var submission = await _context.CreatureSubmissions.SingleAsync(x => x.Id == dto.CreatureSubmissionId);

            var creatures = await _context.Creatures.Where(x => x.BracketId == submission.BracketId).ToListAsync();

            if(creatures.Count >= 16)
            {
                throw new ExpectedException("There are already 16 creatures approved for battle!");
            }

            var creature = new Creature
            {
                BIO = submission.BIO,
                Id = Guid.NewGuid(),
                BracketId = submission.BracketId,
                Name = submission.Name,
                Image = submission.Image,
                Seed = null,
                CreatureSubmissionId = submission.Id
            };

            submission.Status = ECreatureSubmissionStatus.Approved;

            _context.Add(creature);
        }

        public async Task RemoveApprovalAsync(ApproveSubmissionRequestDTO dto)
        {
            var submission = await _context.CreatureSubmissions.SingleAsync(x => x.Id == dto.CreatureSubmissionId);

            var creature = await _context.Creatures.SingleAsync(x => x.CreatureSubmissionId == submission.Id);

            _context.Creatures.Remove(creature);

            submission.Status = ECreatureSubmissionStatus.Pending;
        }

        public async Task<List<CreatureSubmission>> GetAllAsync()
        {
            var submissions = await _context.CreatureSubmissions.AsNoTracking().Select(x => new CreatureSubmission { BIO = x.BIO, BracketId = x.BracketId, EntryDate = x.EntryDate, Id = x.Id, Name = x.Name, Status = x.Status }).OrderByDescending(x => x.Status).ToListAsync();

            return submissions;
        }
    }
}
