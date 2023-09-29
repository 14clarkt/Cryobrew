using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAlchemyTraits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AlchemyTraits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Triggers = table.Column<string>(type: "text", nullable: true),
                    Types = table.Column<string>(type: "text", nullable: true),
                    Tier = table.Column<string>(type: "text", nullable: true),
                    Hidden = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlchemyTraits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlchemyPotencyRanges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Range = table.Column<string>(type: "text", nullable: true),
                    Duration = table.Column<string>(type: "text", nullable: true),
                    Effect = table.Column<string>(type: "text", nullable: true),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    AlchemyTraitId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlchemyPotencyRanges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlchemyPotencyRanges_AlchemyTraits_AlchemyTraitId",
                        column: x => x.AlchemyTraitId,
                        principalTable: "AlchemyTraits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlchemyPotencyRanges_AlchemyTraitId",
                table: "AlchemyPotencyRanges",
                column: "AlchemyTraitId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlchemyPotencyRanges");

            migrationBuilder.DropTable(
                name: "AlchemyTraits");
        }
    }
}
