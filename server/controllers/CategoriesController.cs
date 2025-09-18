using Microsoft.AspNetCore.Mvc;
// using Services;
using models;
// using services.UserService;
using interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace PracticLearningProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }
        // GET
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            var category = await _categoriesService.GetCategoryById(id);
            if(category==null)
                return NotFound($"Category with ID {id} not found.");
            return Ok(category);
        }
    }
}