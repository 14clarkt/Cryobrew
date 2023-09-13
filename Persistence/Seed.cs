using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config)
        {
            await seedRoles(context, roleManager);
            await seedUsers(context, userManager, config);
        }
        private static async Task seedRoles(DataContext context, RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Admin", "Manager", "Member" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
            await context.SaveChangesAsync();
        }
        private static async Task seedUsers(DataContext context, UserManager<AppUser> userManager, IConfiguration config)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Admin", UserName = "admin", Email = "admin@test.com"},
                    new AppUser{DisplayName = "Manager", UserName = "manager", Email = "manager@test.com"},
                    new AppUser{DisplayName = "Member", UserName = "member", Email = "member@test.com"},
                };

                string[] roleNames = { "Admin", "Manager", "Member" };
                for (int i = 0; i < 3; i++)
                {
                    var user = users.ElementAt(i);
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, roleNames[i]);
                }
            }

            var _user = await userManager.FindByEmailAsync(config["MasterEmail"]);
            if (_user == null)
            {

                var poweruser = new AppUser
                {
                    UserName = config["MasterName"],
                    DisplayName = config["MasterName"],
                    Email = config["MasterEmail"],
                };

                string userPWD = config["MasterPassword"];

                {
                    var createPowerUser = await userManager.CreateAsync(poweruser, userPWD);
                    if (createPowerUser.Succeeded)
                    {
                        await userManager.AddToRoleAsync(poweruser, "Admin");
                    }
                }
            }

            await context.SaveChangesAsync();
        }
    }

}


