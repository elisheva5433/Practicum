using System.Collections.Generic;
using interfaces;
using models;
namespace services
{
    public class SubCategoriesService:ISubCategoriesService
    {
        private readonly List<SubCategory> _subCategories;

        public SubCategoriesService()
        {
            
        }

        public IEnumerable<SubCategory> GetSubCategoriesByCategoryId(int categoryId)
        {
            return _subCategories.FindAll(sc => sc.CategoryId == categoryId);
        }
    }
}

