using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using models;
using interfaces;

namespace PracticLearningProject.server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptsController : ControllerBase
    {
        private readonly IPromptsService _promptsService;

        public PromptsController(IPromptsService promptsService)
        {
            _promptsService = promptsService;
        }

        // // GET
        [HttpGet]
        public async Task<IActionResult> GetAllPrompts()
        {
            try{
                 var prompts =await _promptsService.GetAllPrompts();
            return Ok(prompts);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Exception in GetAllPrompts: " + ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }
           
        }

        [HttpGet("GetPromptById/{id}")]
        public async Task<IActionResult> GetPromptById(string id)
        {
            var prompts = await _promptsService.GetPromptById(id);
            if (prompts == null || prompts.Count == 0)
                return NotFound($"No prompts found for user ID {id}.");
            return Ok(prompts);
        }

        [HttpPost("CreatePrompt")]
        public async Task<IActionResult> CreatePrompt([FromBody] Prompt promptData)
        {
            try{
                Console.WriteLine("Creating prompt with data: " + System.Text.Json.JsonSerializer.Serialize(promptData));
                var created = await _promptsService.CreatePrompt(promptData);
                Console.WriteLine("Created prompt:");
                return CreatedAtAction(nameof(GetAllPrompts), new { id = created }, created);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in CreatePrompt: " + ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
