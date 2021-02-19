using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class changednames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BracketRoundMatchups");

            migrationBuilder.DropTable(
                name: "UserBracketRoundMatchups");

            migrationBuilder.DropTable(
                name: "BracketRounds");

            migrationBuilder.DropTable(
                name: "UserBracketRounds");

            migrationBuilder.CreateTable(
                name: "Rounds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BracketId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rounds_Brackets_BracketId",
                        column: x => x.BracketId,
                        principalTable: "Brackets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRounds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserBracketId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RoundType = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRounds_UserBrackets_UserBracketId",
                        column: x => x.UserBracketId,
                        principalTable: "UserBrackets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Matchups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    RoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature2Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true),
                    LoserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Creature1Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    Creature2Votes = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matchups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matchups_Creatures_Creature1Id",
                        column: x => x.Creature1Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matchups_Creatures_Creature2Id",
                        column: x => x.Creature2Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matchups_Creatures_LoserId",
                        column: x => x.LoserId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matchups_Creatures_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matchups_Rounds_RoundId",
                        column: x => x.RoundId,
                        principalTable: "Rounds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserMatchups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserRoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature2Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true),
                    LoserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Creature1Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    Creature2Votes = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMatchups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMatchups_Creatures_Creature1Id",
                        column: x => x.Creature1Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMatchups_Creatures_Creature2Id",
                        column: x => x.Creature2Id,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMatchups_Creatures_LoserId",
                        column: x => x.LoserId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserMatchups_Creatures_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserMatchups_UserRounds_UserRoundId",
                        column: x => x.UserRoundId,
                        principalTable: "UserRounds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matchups_Creature1Id",
                table: "Matchups",
                column: "Creature1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Matchups_Creature2Id",
                table: "Matchups",
                column: "Creature2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Matchups_LoserId",
                table: "Matchups",
                column: "LoserId");

            migrationBuilder.CreateIndex(
                name: "IX_Matchups_RoundId",
                table: "Matchups",
                column: "RoundId");

            migrationBuilder.CreateIndex(
                name: "IX_Matchups_WinnerId",
                table: "Matchups",
                column: "WinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rounds_BracketId",
                table: "Rounds",
                column: "BracketId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchups_Creature1Id",
                table: "UserMatchups",
                column: "Creature1Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchups_Creature2Id",
                table: "UserMatchups",
                column: "Creature2Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchups_LoserId",
                table: "UserMatchups",
                column: "LoserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchups_UserRoundId",
                table: "UserMatchups",
                column: "UserRoundId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchups_WinnerId",
                table: "UserMatchups",
                column: "WinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRounds_UserBracketId",
                table: "UserRounds",
                column: "UserBracketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Matchups");

            migrationBuilder.DropTable(
                name: "UserMatchups");

            migrationBuilder.DropTable(
                name: "Rounds");

            migrationBuilder.DropTable(
                name: "UserRounds");

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
                name: "UserBracketRounds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    RoundType = table.Column<int>(type: "INTEGER", nullable: false),
                    UserBracketId = table.Column<Guid>(type: "TEXT", nullable: false)
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
                name: "BracketRoundMatchups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BracketRoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    Creature2Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature2Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    LoserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true)
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
                name: "UserBracketRoundMatchups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature1Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    Creature2Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Creature2Votes = table.Column<int>(type: "INTEGER", nullable: false),
                    LoserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    UserBracketRoundId = table.Column<Guid>(type: "TEXT", nullable: false),
                    WinnerId = table.Column<Guid>(type: "TEXT", nullable: true)
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
        }
    }
}
