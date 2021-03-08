﻿using CreatureBracket.Models;
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
        public DbSet<User> Users { get; set; }
        public DbSet<UserVerifyRequest> UserVerifyRequests { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Options = options;
        }
    }
}
