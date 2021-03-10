using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class roundrankcreaturecount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Rounds",
                newName: "Rank");

            migrationBuilder.AddColumn<int>(
                name: "CreatureCount",
                table: "Rounds",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatureCount",
                table: "Rounds");

            migrationBuilder.RenameColumn(
                name: "Rank",
                table: "Rounds",
                newName: "Type");
        }
    }
}
