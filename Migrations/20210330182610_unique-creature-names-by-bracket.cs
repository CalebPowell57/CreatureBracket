using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class uniquecreaturenamesbybracket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CreatureSubmissions_Name",
                table: "CreatureSubmissions");

            migrationBuilder.DropIndex(
                name: "IX_Creatures_Name",
                table: "Creatures");

            migrationBuilder.CreateIndex(
                name: "IX_CreatureSubmissions_Name_BracketId",
                table: "CreatureSubmissions",
                columns: new[] { "Name", "BracketId" },
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Creatures_Name_BracketId",
                table: "Creatures",
                columns: new[] { "Name", "BracketId" },
                unique: true,
                filter: "[Name] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CreatureSubmissions_Name_BracketId",
                table: "CreatureSubmissions");

            migrationBuilder.DropIndex(
                name: "IX_Creatures_Name_BracketId",
                table: "Creatures");

            migrationBuilder.CreateIndex(
                name: "IX_CreatureSubmissions_Name",
                table: "CreatureSubmissions",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Creatures_Name",
                table: "Creatures",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");
        }
    }
}
