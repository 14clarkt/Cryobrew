using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
                return await CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Member");
                return await CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return await CreateUserObject(user);
        }

        [HttpPut("update")]
        public async Task<ActionResult<UserDto>> UpdateUserValues(UserEditDto userEditDto)
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            user.CurrentAP = userEditDto.CurrentAP;
            user.MaxAP = userEditDto.MaxAP;
            user.ShortAP = userEditDto.ShortAP;
            user.APCSlots = userEditDto.APCSlots;

            await _userManager.UpdateAsync(user);
            return await CreateUserObject(user);
        }
        
        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                CurrentAP = user.CurrentAP,
                MaxAP = user.MaxAP,
                ShortAP = user.ShortAP,
                APCSlots = user.APCSlots,
                Role = userRoles.ElementAt(0),
                Email = user.Email
            };
        }

        [HttpGet("getall")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDTOs = new List<UserDto>();
            for (int i = 0; i < users.Count; i++) {
                var userDTO = await CreateUserObject(users.ElementAt(i));
                userDTOs.Add(userDTO);
            }
            return userDTOs;
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) throw new Exception("User with email " + email + " does not exist.");
            
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
                return Ok();
            else
                throw new Exception("Error when deleting User with email: " + email);
        }
    }
}