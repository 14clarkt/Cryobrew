using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEnchantments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Enchantments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Points = table.Column<int>(type: "integer", nullable: false),
                    ApplicableEquipment = table.Column<string>(type: "text", nullable: true),
                    Restrictions = table.Column<string>(type: "text", nullable: true),
                    Range = table.Column<string>(type: "text", nullable: true),
                    Duration = table.Column<string>(type: "text", nullable: true),
                    SpecificCosts = table.Column<string>(type: "text", nullable: true),
                    TotalPower = table.Column<int>(type: "integer", nullable: false),
                    EffectCost = table.Column<string>(type: "text", nullable: true),
                    EffectAction = table.Column<string>(type: "text", nullable: true),
                    Effect = table.Column<string>(type: "text", nullable: true),
                    Found = table.Column<bool>(type: "boolean", nullable: false),
                    Learned = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enchantments", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Enchantments");
        }
    }
}
