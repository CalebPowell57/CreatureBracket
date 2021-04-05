using CreatureBracket.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Misc
{
    public class UnitOfWork
    {
        private DatabaseContext _context;

        public AccountRepository AccountRepository { get; private set; }

        public BracketRepository BracketRepository { get; private set; }
        public CreatureSubmissionRepository CreatureSubmissionRepository { get; private set; }
        public UserBracketRepository UserBracketRepository { get; private set; }
        public ChatMessageRepository ChatMessageRepository { get; private set; }
        public RegistryRepository RegistryRepository { get; private set; }
        public RoundRepository RoundRepository { get; private set; }
        public MatchupRepository MatchupRepository { get; private set; }
        public VoteRepository VoteRepository { get; private set; }

        public UnitOfWork(DatabaseContext context)
        {
            _context = context;

            AccountRepository = new AccountRepository(_context);

            BracketRepository = new BracketRepository(_context);
            CreatureSubmissionRepository = new CreatureSubmissionRepository(_context);
            UserBracketRepository = new UserBracketRepository(_context);
            ChatMessageRepository = new ChatMessageRepository(_context);
            RegistryRepository = new RegistryRepository(_context);
            RoundRepository = new RoundRepository(_context);
            MatchupRepository = new MatchupRepository(_context);
            VoteRepository = new VoteRepository(_context);
        }

        public async Task SaveAsync(/*LogProcess logProcess = LogProcess.Internal*/)
        {
            var changedEntities = _context.ChangeTracker.Entries().Where(x =>
                                                                         x.State == EntityState.Modified ||
                                                                         x.State == EntityState.Deleted ||
                                                                         x.State == EntityState.Added)
                                                                         .ToList();

            //Log(logProcess, changedEntities);

            await _context.SaveChangesAsync();
        }
    }
}
