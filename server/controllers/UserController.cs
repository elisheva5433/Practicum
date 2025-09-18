using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
// using Services;
using models;
// using services.UserService;
using interfaces;

namespace PracticLearningProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        // GET
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users=await _userService.GetUsers();
            if(users==null || !users.Any())
                return NotFound("No users found.");
            return Ok(users);
        }

        [HttpGet("byId/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user =await _userService.GetUserById(id);
            if(user==null)
                return NotFound($"User with ID {id} not found.");
            return Ok(user);
        }

        [HttpGet("byName/{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var user =await _userService.GetUserByName(name);
            if(user==null)  
                return NotFound($"User with name {name} not found.");
            return Ok(user);
        }
        [HttpGet("byPhone/{phone}")]
        public async Task<IActionResult> GetUserByPhone(string phone)
        {
            var user =await _userService.GetUserByPhone(phone);
            if(user==null)  
                return NotFound($"User with phone {phone} not found.");
            return Ok(user);
        }

        // POST
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            await _userService.CreateUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        //DELETE
        [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
{
    await _userService.DeleteUser(id);
    return NoContent();
}

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] dynamic user)
        {
            var existingUser =await _userService.GetUserById(id);
            if(existingUser==null)
                return NotFound($"User with ID {id} not found.");
            return NoContent();
        }
    }
}