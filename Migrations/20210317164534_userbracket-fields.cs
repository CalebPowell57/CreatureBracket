using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CreatureBracket.Migrations
{
    public partial class userbracketfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchups_Creatures_Creature1Id",
                table: "UserMatchups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchups_Creatures_Creature2Id",
                table: "UserMatchups");

            migrationBuilder.RenameColumn(
                name: "RoundType",
                table: "UserRounds",
                newName: "Rank");

            migrationBuilder.AlterColumn<Guid>(
                name: "Creature2Id",
                table: "UserMatchups",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "Creature1Id",
                table: "UserMatchups",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "Seed",
                table: "UserMatchups",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchups_Creatures_Creature1Id",
                table: "UserMatchups",
                column: "Creature1Id",
                principalTable: "Creatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchups_Creatures_Creature2Id",
                table: "UserMatchups",
                column: "Creature2Id",
                principalTable: "Creatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchups_Creatures_Creature1Id",
                table: "UserMatchups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchups_Creatures_Creature2Id",
                table: "UserMatchups");

            migrationBuilder.DropColumn(
                name: "Seed",
                table: "UserMatchups");

            migrationBuilder.RenameColumn(
                name: "Rank",
                table: "UserRounds",
                newName: "RoundType");

            migrationBuilder.AlterColumn<Guid>(
                name: "Creature2Id",
                table: "UserMatchups",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Creature1Id",
                table: "UserMatchups",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchups_Creatures_Creature1Id",
                table: "UserMatchups",
                column: "Creature1Id",
                principalTable: "Creatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchups_Creatures_Creature2Id",
                table: "UserMatchups",
                column: "Creature2Id",
                principalTable: "Creatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
