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

        public async Task<List<Prompt>> GetPromptById(string id)
        {
            return await _context.Prompts
                                .Find(prompt => prompt.UserId == id)
                                .ToListAsync(); // מחזיר רשימה ולא אובייקט אחד
        }

        public async Task<Prompt> CreatePrompt(Prompt prompt)
        {
        Console.WriteLine("Inserting prompt into database: " + JsonSerializer.Serialize(prompt));
        await _context.Prompts.InsertOneAsync(prompt);
            return prompt;
        }

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