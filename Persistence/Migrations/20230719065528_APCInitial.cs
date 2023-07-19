using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class APCInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActionPointCards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionPointCards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ActionPointLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Level = table.Column<int>(type: "INTEGER", nullable: false),
                    Range = table.Column<string>(type: "TEXT", nullable: true),
                    Cost = table.Column<string>(type: "TEXT", nullable: true),
                    Duration = table.Column<string>(type: "TEXT", nullable: true),
                    Prerequisite = table.Column<string>(type: "TEXT", nullable: true),
                    UpgradeCost = table.Column<string>(type: "TEXT", nullable: true),
                    CastingTime = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ActionPointCardId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionPointLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActionPointLevels_ActionPointCards_ActionPointCardId",
                        column: x => x.ActionPointCardId,
                        principalTable: "ActionPointCards",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActionPointLevels_ActionPointCardId",
                table: "ActionPointLevels",
                column: "ActionPointCardId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActionPointLevels");

            migrationBuilder.DropTable(
                name: "ActionPointCards");
        }
    }
}
