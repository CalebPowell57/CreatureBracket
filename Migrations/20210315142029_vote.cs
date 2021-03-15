using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class vote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchups_Creatures_LoserId",
                table: "UserMatchups");

            migrationBuilder.DropIndex(
                name: "IX_UserMatchups_LoserId",
                table: "UserMatchups");

            migrationBuilder.DropColumn(
                name: "Creature1Votes",
                table: "UserMatchups");

            migrationBuilder.DropColumn(
                name: "Creature2Votes",
                table: "UserMatchups");

            migrationBuilder.DropColumn(
                name: "LoserId",
                table: "UserMatchups");

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MatchupId = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatureId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votes_Creatures_CreatureId",
                        column: x => x.CreatureId,
                        principalTable: "Creatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Votes_Matchups_MatchupId",
                        column: x => x.MatchupId,
                        principalTable: "Matchups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Votes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Votes_CreatureId",
                table: "Votes",
                column: "CreatureId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_MatchupId",
                table: "Votes",
                column: "MatchupId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_UserId",
                table: "Votes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.AddColumn<int>(
                name: "Creature1Votes",
                table: "UserMatchups",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Creature2Votes",
                table: "UserMatchups",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "LoserId",
                table: "UserMatchups",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchups_LoserId",
                table: "UserMatchups",
                column: "LoserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchups_Creatures_LoserId",
                table: "UserMatchups",
                column: "LoserId",
                principalTable: "Creatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
