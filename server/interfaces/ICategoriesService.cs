using models;

namespace interfaces
{
    public interface ICategoriesService
    {
        Task<Category> GetCategoryById(string id);
    }
}