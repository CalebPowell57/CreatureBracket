using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class removedvotecountmatchup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Creature1Votes",
                table: "Matchups");

            migrationBuilder.DropColumn(
                name: "Creature2Votes",
                table: "Matchups");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Creature1Votes",
                table: "Matchups",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Creature2Votes",
                table: "Matchups",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
