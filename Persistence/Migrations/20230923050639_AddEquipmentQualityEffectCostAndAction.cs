using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEquipmentQualityEffectCostAndAction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EffectAction",
                table: "EquipmentQualities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EffectCost",
                table: "EquipmentQualities",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EffectAction",
                table: "EquipmentQualities");

            migrationBuilder.DropColumn(
                name: "EffectCost",
                table: "EquipmentQualities");
        }
    }
}
