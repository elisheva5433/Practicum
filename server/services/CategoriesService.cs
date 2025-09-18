using System.Collections.Generic;
using interfaces;
using models;
using DATA;
using MongoDB.Driver;
namespace services
{
    public class CategoriesService:ICategoriesService
    {
        private readonly List<Category> _categories;
        private readonly IDbContext _context;

        public CategoriesService(IDbContext context)
        {
            _context = context;
        }

        public async Task<Category> GetCategoryById(string id)
        {
            return await _context.Categories.Find(category => category.Id == id).FirstOrDefaultAsync();
        }
    }
}