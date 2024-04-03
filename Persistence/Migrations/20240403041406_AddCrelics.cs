using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCrelics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Crelics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EquippedBy = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Charges = table.Column<int>(type: "integer", nullable: false),
                    MaxCharges = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crelics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CrelicAbilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CrelicId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrelicAbilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrelicAbilities_Crelics_CrelicId",
                        column: x => x.CrelicId,
                        principalTable: "Crelics",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CrelicSubAbilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    CrelicAbilityId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrelicSubAbilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrelicSubAbilities_CrelicAbilities_CrelicAbilityId",
                        column: x => x.CrelicAbilityId,
                        principalTable: "CrelicAbilities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CrelicSubAbilityLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    CrelicSubAbilityId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrelicSubAbilityLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrelicSubAbilityLevels_CrelicSubAbilities_CrelicSubAbilityId",
                        column: x => x.CrelicSubAbilityId,
                        principalTable: "CrelicSubAbilities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CrelicAbilities_CrelicId",
                table: "CrelicAbilities",
                column: "CrelicId");

            migrationBuilder.CreateIndex(
                name: "IX_CrelicSubAbilities_CrelicAbilityId",
                table: "CrelicSubAbilities",
                column: "CrelicAbilityId");

            migrationBuilder.CreateIndex(
                name: "IX_CrelicSubAbilityLevels_CrelicSubAbilityId",
                table: "CrelicSubAbilityLevels",
                column: "CrelicSubAbilityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrelicSubAbilityLevels");

            migrationBuilder.DropTable(
                name: "CrelicSubAbilities");

            migrationBuilder.DropTable(
                name: "CrelicAbilities");

            migrationBuilder.DropTable(
                name: "Crelics");
        }
    }
}
