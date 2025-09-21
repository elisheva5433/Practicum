using models;
using Microsoft.AspNetCore.Mvc;


namespace PracticLearningProject.server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAIController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OpenAIController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private IActionResult dummyLesson()
        {
            return Ok("This is a dummy lesson response due to OpenAI API failure.");
        }

        [HttpPost("GenerateText")]
        public async Task<IActionResult> GenerateText([FromBody] Prompt prompt)
        {

            var apiKey = _configuration["OpenAI:ApiKey"];
            Console.WriteLine("apiKeykkkkkkkkkkkkkkkk");
            Console.WriteLine(apiKey);
            if (string.IsNullOrEmpty(apiKey))
            {
                return StatusCode(500, "OpenAI API key is not configured.");
            }

            var fullRequestForAi = $"CategoryId: {prompt.CategoryId}, SubcategoryId: {prompt.SubcategoryId}, Text: {prompt.PromptText}";
            Console.WriteLine("Full Request for AI: " + fullRequestForAi);

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

            var requestBody = new
            {
                model = "text-davinci-003",
                prompt = fullRequestForAi,   // <-- במקום text
                max_tokens = 150
            };

            try{
                var response = await httpClient.PostAsJsonAsync("https://api.openai.com/v1/completions", requestBody);
                Console.WriteLine("OpenAI API Response Status: " + response.StatusCode);               
                var responseContent = await response.Content.ReadFromJsonAsync<OpenAIResponse>();            
                return Ok(responseContent.choices.FirstOrDefault()?.text.Trim());
            }
            catch(Exception ex)
            {
                Console.WriteLine("Exception when calling OpenAI API: " + ex.Message);
                return dummyLesson();
            }
            // var response = await httpClient.PostAsJsonAsync("https://api.openai.com/v1/completions", requestBody);
            // Console.WriteLine("OpenAI API Response Status: " + response.StatusCode);
            // if (!response.IsSuccessStatusCode)
            // {
            //     return StatusCode((int)response.StatusCode, "Error from OpenAI API");
            // }

        }
    }

    public class OpenAIResponse
    {
        public List<Choice> choices { get; set; }
    }

    public class Choice
    {
        public string text { get; set; }
    }
}