using Microsoft.AspNetCore.Mvc;
using models;
using interfaces;

namespace PracticLearningProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ISubCategoriesService _subCategoriesService;

        public SubCategoriesController(ISubCategoriesService SubCategoriesService)
        {
            _subCategoriesService = SubCategoriesService; 
        }
        
        // GET
        [HttpGet("GetSubCategories/{id}")]
        public async Task<IActionResult> GetSubCategoriesByCategoryId(int id)
        {
            var subCategories=_subCategoriesService.GetSubCategoriesByCategoryId(id);
            if(subCategories==null || !subCategories.Any())
                return NotFound("No subcategories found.");
            return Ok(subCategories);
        }
    }
}