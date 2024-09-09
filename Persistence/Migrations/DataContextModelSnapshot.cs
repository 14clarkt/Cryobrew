﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.ActionPointCard", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("EquippedBy")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("UpgradeLevel")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("ActionPointCards");
                });

            modelBuilder.Entity("Domain.ActionPointLevel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ActionPointCardId")
                        .HasColumnType("uuid");

                    b.Property<string>("CastingTime")
                        .HasColumnType("text");

                    b.Property<string>("Cost")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Duration")
                        .HasColumnType("text");

                    b.Property<int>("Level")
                        .HasColumnType("integer");

                    b.Property<string>("Prerequisite")
                        .HasColumnType("text");

                    b.Property<string>("Range")
                        .HasColumnType("text");

                    b.Property<string>("UpgradeCost")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ActionPointCardId");

                    b.ToTable("ActionPointLevels");
                });

            modelBuilder.Entity("Domain.AlchemyIngredient", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BiomesCreatures")
                        .HasColumnType("text");

                    b.Property<bool>("Hidden")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("PerUse")
                        .HasColumnType("integer");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<string>("Types")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AlchemyIngredients");
                });

            modelBuilder.Entity("Domain.AlchemyIngredientPotency", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AlchemyIngredientId")
                        .HasColumnType("uuid");

                    b.Property<int>("Potency")
                        .HasColumnType("integer");

                    b.Property<string>("TraitName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AlchemyIngredientId");

                    b.ToTable("AlchemyIngredientPotencies");
                });

            modelBuilder.Entity("Domain.AlchemyPotencyRange", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AlchemyTraitId")
                        .HasColumnType("uuid");

                    b.Property<string>("Duration")
                        .HasColumnType("text");

                    b.Property<string>("Effect")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Range")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AlchemyTraitId");

                    b.ToTable("AlchemyPotencyRanges");
                });

            modelBuilder.Entity("Domain.AlchemyProduct", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Count")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AlchemyProducts");
                });

            modelBuilder.Entity("Domain.AlchemyTrait", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Hidden")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Tier")
                        .HasColumnType("text");

                    b.Property<string>("Triggers")
                        .HasColumnType("text");

                    b.Property<string>("Types")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AlchemyTraits");
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("APCSlots")
                        .HasColumnType("integer");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("Bio")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<int>("CurrentAP")
                        .HasColumnType("integer");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MaxAP")
                        .HasColumnType("integer");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<int>("ShortAP")
                        .HasColumnType("integer");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.Crelic", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Charges")
                        .HasColumnType("integer");

                    b.Property<int>("MaxCharges")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<bool>("isHidden")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Crelics");
                });

            modelBuilder.Entity("Domain.CrelicAbility", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("CrelicId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CrelicId");

                    b.ToTable("CrelicAbilities");
                });

            modelBuilder.Entity("Domain.CrelicSubAbility", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("CrelicAbilityId")
                        .HasColumnType("uuid");

                    b.Property<int>("Level")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CrelicAbilityId");

                    b.ToTable("CrelicSubAbilities");
                });

            modelBuilder.Entity("Domain.CrelicSubAbilityLevel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Cost")
                        .HasColumnType("integer");

                    b.Property<Guid?>("CrelicSubAbilityId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("Level")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CrelicSubAbilityId");

                    b.ToTable("CrelicSubAbilityLevels");
                });

            modelBuilder.Entity("Domain.Enchantment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("ApplicableEquipment")
                        .HasColumnType("text");

                    b.Property<string>("Duration")
                        .HasColumnType("text");

                    b.Property<string>("Effect")
                        .HasColumnType("text");

                    b.Property<string>("EffectAction")
                        .HasColumnType("text");

                    b.Property<string>("EffectCost")
                        .HasColumnType("text");

                    b.Property<bool>("Found")
                        .HasColumnType("boolean");

                    b.Property<bool>("Learned")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<string>("Range")
                        .HasColumnType("text");

                    b.Property<string>("Restrictions")
                        .HasColumnType("text");

                    b.Property<string>("SpecificCosts")
                        .HasColumnType("text");

                    b.Property<int>("TotalPower")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Enchantments");
                });

            modelBuilder.Entity("Domain.EquipmentQuality", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Cost")
                        .HasColumnType("text");

                    b.Property<string>("Effect")
                        .HasColumnType("text");

                    b.Property<string>("EffectAction")
                        .HasColumnType("text");

                    b.Property<string>("EffectCost")
                        .HasColumnType("text");

                    b.Property<string>("Equipment")
                        .HasColumnType("text");

                    b.Property<bool>("Found")
                        .HasColumnType("boolean");

                    b.Property<bool>("Learned")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<string>("Restrictions")
                        .HasColumnType("text");

                    b.Property<string>("Tools")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("EquipmentQualities");
                });

            modelBuilder.Entity("Domain.MagicItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Charges")
                        .HasColumnType("integer");

                    b.Property<int>("Count")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("EquippedBy")
                        .HasColumnType("text");

                    b.Property<bool>("IsHidden")
                        .HasColumnType("boolean");

                    b.Property<int>("MaxCharges")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("MagicItems");
                });

            modelBuilder.Entity("Domain.Rule", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Group")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Rules");
                });

            modelBuilder.Entity("Domain.Supply", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Denomination")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Supplies");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.ActionPointLevel", b =>
                {
                    b.HasOne("Domain.ActionPointCard", null)
                        .WithMany("ActionPointLevels")
                        .HasForeignKey("ActionPointCardId");
                });

            modelBuilder.Entity("Domain.AlchemyIngredientPotency", b =>
                {
                    b.HasOne("Domain.AlchemyIngredient", null)
                        .WithMany("Potencies")
                        .HasForeignKey("AlchemyIngredientId");
                });

            modelBuilder.Entity("Domain.AlchemyPotencyRange", b =>
                {
                    b.HasOne("Domain.AlchemyTrait", null)
                        .WithMany("PotencyRanges")
                        .HasForeignKey("AlchemyTraitId");
                });

            modelBuilder.Entity("Domain.CrelicAbility", b =>
                {
                    b.HasOne("Domain.Crelic", null)
                        .WithMany("CrelicAbilities")
                        .HasForeignKey("CrelicId");
                });

            modelBuilder.Entity("Domain.CrelicSubAbility", b =>
                {
                    b.HasOne("Domain.CrelicAbility", null)
                        .WithMany("CrelicSubAbilities")
                        .HasForeignKey("CrelicAbilityId");
                });

            modelBuilder.Entity("Domain.CrelicSubAbilityLevel", b =>
                {
                    b.HasOne("Domain.CrelicSubAbility", null)
                        .WithMany("CrelicSubAbilityLevels")
                        .HasForeignKey("CrelicSubAbilityId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.ActionPointCard", b =>
                {
                    b.Navigation("ActionPointLevels");
                });

            modelBuilder.Entity("Domain.AlchemyIngredient", b =>
                {
                    b.Navigation("Potencies");
                });

            modelBuilder.Entity("Domain.AlchemyTrait", b =>
                {
                    b.Navigation("PotencyRanges");
                });

            modelBuilder.Entity("Domain.Crelic", b =>
                {
                    b.Navigation("CrelicAbilities");
                });

            modelBuilder.Entity("Domain.CrelicAbility", b =>
                {
                    b.Navigation("CrelicSubAbilities");
                });

            modelBuilder.Entity("Domain.CrelicSubAbility", b =>
                {
                    b.Navigation("CrelicSubAbilityLevels");
                });
#pragma warning restore 612, 618
        }
    }
}
