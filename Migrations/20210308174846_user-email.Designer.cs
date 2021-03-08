﻿// <auto-generated />
using System;
using CreatureBracket.Misc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CreatureBracket.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210308174846_user-email")]
    partial class useremail
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.3");

            modelBuilder.Entity("CreatureBracket.Models.Bracket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("CreatureEntryDeadline")
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("WinnerId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Brackets");
                });

            modelBuilder.Entity("CreatureBracket.Models.Creature", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("BIO")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.ToTable("Creatures");
                });

            modelBuilder.Entity("CreatureBracket.Models.CreatureSubmission", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("BIO")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EntryDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.ToTable("CreatureSubmissions");
                });

            modelBuilder.Entity("CreatureBracket.Models.Matchup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("Creature1Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("Creature1Votes")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("Creature2Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("Creature2Votes")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("LoserId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RoundId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("WinnerId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Creature1Id");

                    b.HasIndex("Creature2Id");

                    b.HasIndex("LoserId");

                    b.HasIndex("RoundId");

                    b.HasIndex("WinnerId");

                    b.ToTable("Matchups");
                });

            modelBuilder.Entity("CreatureBracket.Models.Round", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.ToTable("Rounds");
                });

            modelBuilder.Entity("CreatureBracket.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserBracket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("BracketId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("BracketId");

                    b.HasIndex("UserId");

                    b.ToTable("UserBrackets");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserMatchup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("Creature1Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("Creature1Votes")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("Creature2Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("Creature2Votes")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("LoserId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserRoundId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("WinnerId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Creature1Id");

                    b.HasIndex("Creature2Id");

                    b.HasIndex("LoserId");

                    b.HasIndex("UserRoundId");

                    b.HasIndex("WinnerId");

                    b.ToTable("UserMatchups");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserRound", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("RoundType")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("UserBracketId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserBracketId");

                    b.ToTable("UserRounds");
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

                    b.HasOne("CreatureBracket.Models.User", "User")
                        .WithMany("Brackets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bracket");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CreatureBracket.Models.UserMatchup", b =>
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

                    b.Navigation("Loser");

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

            modelBuilder.Entity("CreatureBracket.Models.Round", b =>
                {
                    b.Navigation("Matchups");
                });

            modelBuilder.Entity("CreatureBracket.Models.User", b =>
                {
                    b.Navigation("Brackets");
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
