using Microsoft.AspNetCore.Mvc;
// using PracticLearningProject.server.Models;
// using PracticLearningProject.server.Services;
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
                Console.WriteLine("❌ Exception in GetAllPrompts: " + ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }
           
        }

        // GET
        // [HttpGet("GetPromptById/{id}")]
        // public async Task<IActionResult> GetPromptById(string id)
        // {
        //     var prompt = _promptsService.GetPromptById(id);
        //     if (prompt == null)
        //         return NotFound();

        //     return Ok(prompt);
        // }
////////////////////////////////////////////////////////////////////////////////////

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
            Console.WriteLine("❌ Exception in CreatePrompt: " + ex.Message);
            return StatusCode(500, new { error = ex.Message });
        }
    }

/////////////////////////////////////////////////////////////////////////////////////
        // PUT
        // [HttpPut("{id}")]
        // public IActionResult UpdatePrompt(int id, Prompt prompt)
        // {
        //     if (id != prompt.Id)
        //         return BadRequest("ID mismatch");

        //     var success = await _promptsService.UpdUpdatePromptatePromptAsync(prompt);
        //     if (!success)
        //         return NotFound();

        //     return NoContent();
        // }

        // DELETE
        // [HttpDelete("DeletePrompt/{id}")]
        // public async Task<IActionResult> DeletePrompt(string id)
        // {
        //     _promptsService.DeletePrompt(id);
        //     return NoContent();
            
        // }
    }
}
