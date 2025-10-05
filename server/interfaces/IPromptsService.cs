
using System.Collections.Generic;
using models;

namespace interfaces
{
    public interface IPromptsService
    {
        Task<List<Prompt>> GetAllPrompts();
        Task<List<Prompt>> GetPromptById(string id);
        Task<Prompt> CreatePrompt(Prompt prompt);
    }
}




















// using System.Collections.Generic;
// using System.Threading.Tasks;
// // using PracticLearningProject.server.Models;
// using models;

// namespace interfaces
// {
//     public interface IPromptsService
//     {
//         Task<IEnumerable<Prompt>> GetAllAsync();
//         Task<Prompt> GetByIdAsync(int id);
//         Task<Prompt> AddAsync(Prompt prompt);
//         Task<bool> UpdateAsync(Prompt prompt);
//         Task<bool> DeleteAsync(int id);
//             // Task<IEnumerable<Prompt>> GetPromptsBySubCategoryId(int subCategoryId); // חדש
//     }
// }
