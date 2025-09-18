using System.Collections.Generic;
using models;

namespace interfaces
{
    public interface ISubCategoriesService
    {
        IEnumerable<SubCategory> GetSubCategoriesByCategoryId(int categoryId);
    }
}
