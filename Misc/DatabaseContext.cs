using CreatureBracket.Models;
using Microsoft.EntityFrameworkCore;

namespace CreatureBracket.Misc
{
    public class DatabaseContext : DbContext
    {
        public DbContextOptions<DatabaseContext> Options { get; }

        public DbSet<Bracket> Brackets { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<Matchup> Matchups { get; set; }
        public DbSet<UserBracket> UserBrackets { get; set; }
        public DbSet<UserRound> UserRounds { get; set; }
        public DbSet<UserMatchup> UserMatchups { get; set; }
        public DbSet<CreatureSubmission> CreatureSubmissions { get; set; }
        public DbSet<Creature> Creatures { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<RegistryItem> Registry { get; set; }
        public DbSet<Vote> Votes { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Options = options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RegistryItem>()
                        .HasIndex(x => x.Key)
                        .IsUnique();

            modelBuilder.Entity<Vote>()
                        .HasIndex(x => new { x.MatchupId, x.UserName })
                        .IsUnique();

            modelBuilder.Entity<CreatureSubmission>()
                        .HasIndex(x => new { x.Name, x.BracketId })
                        .IsUnique();

            modelBuilder.Entity<Creature>()
                        .HasIndex(x => new { x.Name, x.BracketId })
                        .IsUnique();
        }
    }
}
