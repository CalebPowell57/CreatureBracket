using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class matchupsystemdatetime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Rounds");

            migrationBuilder.AddColumn<DateTime>(
                name: "SystemDateTime",
                table: "Matchups",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SystemDateTime",
                table: "Matchups");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "Rounds",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
