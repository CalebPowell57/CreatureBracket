using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class bracketchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatureEntryDeadline",
                table: "Brackets",
                newName: "CompletedDateTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "BracketSubmissionDeadline",
                table: "Brackets",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BracketSubmissionDeadline",
                table: "Brackets");

            migrationBuilder.RenameColumn(
                name: "CompletedDateTime",
                table: "Brackets",
                newName: "CreatureEntryDeadline");
        }
    }
}
