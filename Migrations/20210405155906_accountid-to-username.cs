using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class accountidtousername : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Votes_MatchupId_AccountId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "UserBrackets");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "ChatMessages");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Votes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "UserBrackets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "ChatMessages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Votes_MatchupId_UserName",
                table: "Votes",
                columns: new[] { "MatchupId", "UserName" },
                unique: true,
                filter: "[UserName] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Votes_MatchupId_UserName",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "UserBrackets");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "ChatMessages");

            migrationBuilder.AddColumn<Guid>(
                name: "AccountId",
                table: "Votes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AccountId",
                table: "UserBrackets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AccountId",
                table: "ChatMessages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Votes_MatchupId_AccountId",
                table: "Votes",
                columns: new[] { "MatchupId", "AccountId" },
                unique: true);
        }
    }
}
