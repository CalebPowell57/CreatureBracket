﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class addedstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "CreatureSubmissions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "CreatureSubmissions");
        }
    }
}
