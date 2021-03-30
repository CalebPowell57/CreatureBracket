﻿// <auto-generated />
using System;
using CreatureBracket.Misc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CreatureBracket.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210330182610_unique-creature-names-by-bracket")]
    partial class uniquecreaturenamesbybracket
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CreatureBracket.Models.Bracket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatureEntryDeadline")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("WinnerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("Brackets");
                });

            modelBuilder.Entity("CreatureBracket.Models.ChatMessage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SystemDateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("CreatureBracket.Models.Creature", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BIO")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("Seed")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.HasIndex("Name", "BracketId")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Creatures");
                });

            modelBuilder.Entity("CreatureBracket.Models.CreatureSubmission", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BIO")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("EntryDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.HasIndex("Name", "BracketId")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("CreatureSubmissions");
                });

            modelBuilder.Entity("CreatureBracket.Models.Matchup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Creature1Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Creature2Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LoserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoundId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("SystemDateTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("WinnerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Creature1Id");

                    b.HasIndex("Creature2Id");

                    b.HasIndex("LoserId");

                    b.HasIndex("RoundId");

                    b.HasIndex("WinnerId");

                    b.ToTable("Matchups");
                });

            modelBuilder.Entity("CreatureBracket.Models.RegistryItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Key")
                        .IsUnique()
                        .HasFilter("[Key] IS NOT NULL");

                    b.ToTable("Registry");
                });

            modelBuilder.Entity("CreatureBracket.Models.Round", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("CreatureCount")
                        .HasColumnType("int");

                    b.Property<int>("Rank")
                        .HasColumnType("int");

                    b.Property<DateTime>("VoteDeadline")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.ToTable("Rounds");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserBracket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.ToTable("UserBrackets");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserMatchup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Creature1Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Creature2Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Seed")
                        .HasColumnType("int");

                    b.Property<Guid>("UserRoundId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("WinnerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Creature1Id");

                    b.HasIndex("Creature2Id");

                    b.HasIndex("UserRoundId");

                    b.HasIndex("WinnerId");

                    b.ToTable("UserMatchups");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserRound", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Rank")
                        .HasColumnType("int");

                    b.Property<Guid>("UserBracketId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserBracketId");

                    b.ToTable("UserRounds");
                });

            modelBuilder.Entity("CreatureBracket.Models.Vote", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CreatureId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MatchupId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CreatureId");

                    b.HasIndex("MatchupId", "AccountId")
                        .IsUnique();

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("CreatureBracket.Models.Creature", b =>
                {
                    b.HasOne("CreatureBracket.Models.Bracket", "Bracket")
                        .WithMany()
                        .HasForeignKey("BracketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bracket");
                });

            modelBuilder.Entity("CreatureBracket.Models.CreatureSubmission", b =>
                {
                    b.HasOne("CreatureBracket.Models.Bracket", "Bracket")
                        .WithMany()
                        .HasForeignKey("BracketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bracket");
                });

            modelBuilder.Entity("CreatureBracket.Models.Matchup", b =>
                {
                    b.HasOne("CreatureBracket.Models.Creature", "Creature1")
                        .WithMany()
                        .HasForeignKey("Creature1Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CreatureBracket.Models.Creature", "Creature2")
                        .WithMany()
                        .HasForeignKey("Creature2Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CreatureBracket.Models.Creature", "Loser")
                        .WithMany()
                        .HasForeignKey("LoserId");

                    b.HasOne("CreatureBracket.Models.Round", "Round")
                        .WithMany("Matchups")
                        .HasForeignKey("RoundId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CreatureBracket.Models.Creature", "Winner")
                        .WithMany()
                        .HasForeignKey("WinnerId");

                    b.Navigation("Creature1");

                    b.Navigation("Creature2");

                    b.Navigation("Loser");

                    b.Navigation("Round");

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("CreatureBracket.Models.Round", b =>
                {
                    b.HasOne("CreatureBracket.Models.Bracket", "Bracket")
                        .WithMany()
                        .HasForeignKey("BracketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bracket");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserBracket", b =>
                {
                    b.HasOne("CreatureBracket.Models.Bracket", "Bracket")
                        .WithMany()
                        .HasForeignKey("BracketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bracket");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserMatchup", b =>
                {
                    b.HasOne("CreatureBracket.Models.Creature", "Creature1")
                        .WithMany()
                        .HasForeignKey("Creature1Id");

                    b.HasOne("CreatureBracket.Models.Creature", "Creature2")
                        .WithMany()
                        .HasForeignKey("Creature2Id");

                    b.HasOne("CreatureBracket.Models.UserRound", "Round")
                        .WithMany("Matchups")
                        .HasForeignKey("UserRoundId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CreatureBracket.Models.Creature", "Winner")
                        .WithMany()
                        .HasForeignKey("WinnerId");

                    b.Navigation("Creature1");

                    b.Navigation("Creature2");

                    b.Navigation("Round");

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserRound", b =>
                {
                    b.HasOne("CreatureBracket.Models.UserBracket", "Bracket")
                        .WithMany("Rounds")
                        .HasForeignKey("UserBracketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bracket");
                });

            modelBuilder.Entity("CreatureBracket.Models.Vote", b =>
                {
                    b.HasOne("CreatureBracket.Models.Creature", "Creature")
                        .WithMany()
                        .HasForeignKey("CreatureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CreatureBracket.Models.Matchup", "Matchup")
                        .WithMany("Votes")
                        .HasForeignKey("MatchupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Creature");

                    b.Navigation("Matchup");
                });

            modelBuilder.Entity("CreatureBracket.Models.Matchup", b =>
                {
                    b.Navigation("Votes");
                });

            modelBuilder.Entity("CreatureBracket.Models.Round", b =>
                {
                    b.Navigation("Matchups");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserBracket", b =>
                {
                    b.Navigation("Rounds");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserRound", b =>
                {
                    b.Navigation("Matchups");
                });
#pragma warning restore 612, 618
        }
    }
}
