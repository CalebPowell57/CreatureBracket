using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class uniquevotespermatchup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Votes_MatchupId",
                table: "Votes");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_MatchupId_UserId",
                table: "Votes",
                columns: new[] { "MatchupId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmailAddress",
                table: "Users",
                column: "EmailAddress",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Votes_MatchupId_UserId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Users_EmailAddress",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_MatchupId",
                table: "Votes",
                column: "MatchupId");
        }
    }
}
