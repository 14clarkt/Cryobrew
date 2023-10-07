using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPerUseToAlchemyIngredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "AlchemyIngredients",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "hidden",
                table: "AlchemyIngredients",
                newName: "Hidden");

            migrationBuilder.AddColumn<int>(
                name: "PerUse",
                table: "AlchemyIngredients",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PerUse",
                table: "AlchemyIngredients");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "AlchemyIngredients",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "Hidden",
                table: "AlchemyIngredients",
                newName: "hidden");
        }
    }
}
