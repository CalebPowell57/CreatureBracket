using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brackets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatureEntryDeadline = table.Column<DateTime>(type: "TEXT", nullable: true),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brackets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BracketRounds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BracketId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BracketRounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BracketRounds_Brackets_BracketId",
                        column: x => x.BracketId,
                        principalTable: "Brackets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CreatureRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BracketId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    BIO = table.Column<string>(type: "TEXT", nullable: true),
                    EntryDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreatureRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreatureRequests_Brackets_BracketId",
                        column: x => x.BracketId,
                        principalTable: "Brackets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Creatures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BracketId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    BIO = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Creatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Creatures_Brackets_BracketId",
                        column: x => x.BracketId,
                        principalTable: "Brackets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBrackets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBrackets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBrackets_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BracketRoundMatchups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BracketRoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature2Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true),
                    LoserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Creature1Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    Creature2Votes = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BracketRoundMatchups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BracketRoundMatchups_BracketRounds_BracketRoundId",
                        column: x => x.BracketRoundId,
                        principalTable: "BracketRounds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BracketRoundMatchups_Creatures_Creature1Id",
                        column: x => x.Creature1Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BracketRoundMatchups_Creatures_Creature2Id",
                        column: x => x.Creature2Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BracketRoundMatchups_Creatures_LoserId",
                        column: x => x.LoserId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BracketRoundMatchups_Creatures_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserBracketRounds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserBracketId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RoundType = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBracketRounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBracketRounds_UserBrackets_UserBracketId",
                        column: x => x.UserBracketId,
                        principalTable: "UserBrackets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBracketRoundMatchups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserBracketRoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature2Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true),
                    LoserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Creature1Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    Creature2Votes = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBracketRoundMatchups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBracketRoundMatchups_Creatures_Creature1Id",
                        column: x => x.Creature1Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBracketRoundMatchups_Creatures_Creature2Id",
                        column: x => x.Creature2Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBracketRoundMatchups_Creatures_LoserId",
                        column: x => x.LoserId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserBracketRoundMatchups_Creatures_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserBracketRoundMatchups_UserBracketRounds_UserBracketRoundId",
                        column: x => x.UserBracketRoundId,
                        principalTable: "UserBracketRounds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BracketRoundMatchups_BracketRoundId",
                table: "BracketRoundMatchups",
                column: "BracketRoundId");

            migrationBuilder.CreateIndex(
                name: "IX_BracketRoundMatchups_Creature1Id",
                table: "BracketRoundMatchups",
                column: "Creature1Id");

            migrationBuilder.CreateIndex(
                name: "IX_BracketRoundMatchups_Creature2Id",
                table: "BracketRoundMatchups",
                column: "Creature2Id");

            migrationBuilder.CreateIndex(
                name: "IX_BracketRoundMatchups_LoserId",
                table: "BracketRoundMatchups",
                column: "LoserId");

            migrationBuilder.CreateIndex(
                name: "IX_BracketRoundMatchups_WinnerId",
                table: "BracketRoundMatchups",
                column: "WinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_BracketRounds_BracketId",
                table: "BracketRounds",
                column: "BracketId");

            migrationBuilder.CreateIndex(
                name: "IX_CreatureRequests_BracketId",
                table: "CreatureRequests",
                column: "BracketId");

            migrationBuilder.CreateIndex(
                name: "IX_Creatures_BracketId",
                table: "Creatures",
                column: "BracketId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBracketRoundMatchups_Creature1Id",
                table: "UserBracketRoundMatchups",
                column: "Creature1Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserBracketRoundMatchups_Creature2Id",
                table: "UserBracketRoundMatchups",
                column: "Creature2Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserBracketRoundMatchups_LoserId",
                table: "UserBracketRoundMatchups",
                column: "LoserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBracketRoundMatchups_UserBracketRoundId",
                table: "UserBracketRoundMatchups",
                column: "UserBracketRoundId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBracketRoundMatchups_WinnerId",
                table: "UserBracketRoundMatchups",
                column: "WinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBracketRounds_UserBracketId",
                table: "UserBracketRounds",
                column: "UserBracketId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBrackets_UserId",
                table: "UserBrackets",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BracketRoundMatchups");

            migrationBuilder.DropTable(
                name: "CreatureRequests");

            migrationBuilder.DropTable(
                name: "UserBracketRoundMatchups");

            migrationBuilder.DropTable(
                name: "BracketRounds");

            migrationBuilder.DropTable(
                name: "Creatures");

            migrationBuilder.DropTable(
                name: "UserBracketRounds");

            migrationBuilder.DropTable(
                name: "Brackets");

            migrationBuilder.DropTable(
                name: "UserBrackets");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
