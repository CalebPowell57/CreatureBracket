using CreatureBracket.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.Misc
{
    public class UnitOfWork
    {
        private DatabaseContext _context;

        public SecurityRepository SecurityRepository { get; private set; }
        public BracketRepository BracketRepository { get; private set; }

        public UnitOfWork(DatabaseContext context)
        {
            _context = context;

            SecurityRepository = new SecurityRepository(_context);
            BracketRepository = new BracketRepository(_context);
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
