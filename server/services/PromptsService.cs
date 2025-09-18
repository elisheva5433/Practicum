using System.Collections.Generic;
using interfaces;
using models;
using System.Text.Json;
using System.Text;
using DATA;
using MongoDB.Driver;
using MongoDB.Bson;

namespace services
{
    public class PromptsService : IPromptsService
    {
        private readonly HttpClient _httpClient;
        private readonly IDbContext _context;


    public PromptsService(HttpClient httpClient,IDbContext context)
    {
        _context = context;
        _httpClient = httpClient;
    }

        
    public async Task<List<Prompt>> GetAllPrompts()
    {
        return await _context.Prompts.Find(_ => true).ToListAsync();
    }



        // public async Task<Prompt> GetPromptById(string id)
        // {
        //     return await _context.Prompts.Find(prompt => prompt.Id == id).FirstOrDefaultAsync();
            
        // }

        public async Task<Prompt> CreatePrompt(Prompt prompt)
        {
            Console.WriteLine("sdffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        //     try
        //     {
        //     // המרת הפרומפט ל־JSON
        //     var json = JsonSerializer.Serialize(prompt);
        //     var content = new StringContent(json, Encoding.UTF8, "application/json");
        //     // שליחת הבקשה ל־API חיצוני
        //     var response = await _httpClient.PostAsync("http://localhost:5084/api/OpenAI/GenerateText", content);
        //     response.EnsureSuccessStatusCode();

        //     var responseData = await response.Content.ReadAsStringAsync();
        //     Console.WriteLine("Response from API: " + responseData);
        // }
        // catch (Exception ex)
        // {
        //     Console.WriteLine("Error calling API: " + ex.Message);
        // }
        Console.WriteLine("Inserting prompt into database: " + JsonSerializer.Serialize(prompt));
        await _context.Prompts.InsertOneAsync(prompt);
            return prompt;
        }

        // public bool UpdatePrompt(Prompt prompt)
        // {
        //     var existingPrompt = GetPromptById(prompt.Id);
        //     if (existingPrompt != null)
        //     {
        //         existingPrompt.Text = prompt.Text;
        //         return true;
        //     }
        //     return false;
        // }

//  public async Task DeletePrompt(string id)
// {
//     await _context.Prompts.DeleteOneAsync(prompt => prompt.Id == id);
// }

    }
}








































// using System.Collections.Generic;
// using System.Threading.Tasks;
// // using PracticLearningProject.server.Models;
// // using PracticLearningProject.server.Data;
// using interfaces;
// using models;

// namespace PracticLearningProject.server.Services
// {
//     public class PromptsService:IPromptsService
//     {
//         private readonly IPromptsService _promptsService;

//         public async Task<IEnumerable<Prompt>> GetAllAsync()
//         {
//             return await _promptsService.GetAllAsync();
//         }

//         public async Task<Prompt> GetByIdAsync(int id)
//         {
//             return await _promptsService.GetByIdAsync(id);
//         }

//         public async Task<Prompt> AddAsync(Prompt prompt)
//         {
//             return await _promptsService.AddAsync(prompt);
//         }

//         public async Task<bool> UpdateAsync(Prompt prompt)
//         {
//             return await _promptsService.UpdateAsync(prompt);
//         }

//         public async Task<bool> DeleteAsync(int id)
//         {
//             return await _promptsService.DeleteAsync(id);
//         }
//     }
// }