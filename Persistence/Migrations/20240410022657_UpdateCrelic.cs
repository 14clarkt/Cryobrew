using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCrelic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquippedBy",
                table: "Crelics");

            migrationBuilder.AddColumn<bool>(
                name: "isHidden",
                table: "Crelics",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isHidden",
                table: "Crelics");

            migrationBuilder.AddColumn<string>(
                name: "EquippedBy",
                table: "Crelics",
                type: "text",
                nullable: true);
        }
    }
}
