using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAlchemyIngredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AlchemyIngredients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    BiomesCreatures = table.Column<string>(type: "text", nullable: true),
                    Types = table.Column<string>(type: "text", nullable: true),
                    quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlchemyIngredients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlchemyIngredientPotencies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TraitName = table.Column<string>(type: "text", nullable: true),
                    Potency = table.Column<int>(type: "integer", nullable: false),
                    AlchemyIngredientId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlchemyIngredientPotencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlchemyIngredientPotencies_AlchemyIngredients_AlchemyIngred~",
                        column: x => x.AlchemyIngredientId,
                        principalTable: "AlchemyIngredients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlchemyIngredientPotencies_AlchemyIngredientId",
                table: "AlchemyIngredientPotencies",
                column: "AlchemyIngredientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlchemyIngredientPotencies");

            migrationBuilder.DropTable(
                name: "AlchemyIngredients");
        }
    }
}
