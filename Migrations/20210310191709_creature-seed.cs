using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class creatureseed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Seed",
                table: "Creatures",
                type: "INTEGER",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Seed",
                table: "Creatures");
        }
    }
}
