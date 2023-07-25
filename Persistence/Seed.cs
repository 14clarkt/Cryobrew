using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config)
        {
            await seedActivities(context);
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

        private static async Task seedActivities(DataContext context)
        {
            //checks if there is anything in the database
            // if there is, then it doesn't seed.
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }

}


