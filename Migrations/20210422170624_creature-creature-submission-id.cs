using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class creaturecreaturesubmissionid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatureSubmissionId",
                table: "Creatures",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: "ADD3CE53-7628-4CEF-8842-1145978CF03D");

            migrationBuilder.CreateIndex(
                name: "IX_Creatures_CreatureSubmissionId",
                table: "Creatures",
                column: "CreatureSubmissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Creatures_CreatureSubmissions_CreatureSubmissionId",
                table: "Creatures",
                column: "CreatureSubmissionId",
                principalTable: "CreatureSubmissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Creatures_CreatureSubmissions_CreatureSubmissionId",
                table: "Creatures");

            migrationBuilder.DropIndex(
                name: "IX_Creatures_CreatureSubmissionId",
                table: "Creatures");

            migrationBuilder.DropColumn(
                name: "CreatureSubmissionId",
                table: "Creatures");
        }
    }
}
