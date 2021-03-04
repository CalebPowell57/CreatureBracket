using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class userbracketbracketid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BracketId",
                table: "UserBrackets",
                type: "TEXT",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_UserBrackets_BracketId",
                table: "UserBrackets",
                column: "BracketId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBrackets_Brackets_BracketId",
                table: "UserBrackets",
                column: "BracketId",
                principalTable: "Brackets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBrackets_Brackets_BracketId",
                table: "UserBrackets");

            migrationBuilder.DropIndex(
                name: "IX_UserBrackets_BracketId",
                table: "UserBrackets");

            migrationBuilder.DropColumn(
                name: "BracketId",
                table: "UserBrackets");
        }
    }
}
