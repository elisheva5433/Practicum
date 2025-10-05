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

            var apiKey = _configuration["OpenAI:ApiKey"];//שימוש במפתח מהקובץ appsettings.json
            if (string.IsNullOrEmpty(apiKey))
            {
                return StatusCode(500, "OpenAI API key is not configured.");
            }

            //תמלול הבקשה המלאה ל-AI
            var fullRequestForAi = $"CategoryId: {prompt.CategoryId}, SubcategoryId: {prompt.SubcategoryId}, Text: {prompt.PromptText}";
            Console.WriteLine("Full Request for AI: " + fullRequestForAi);

            //התחברות ל-OpenAI API
            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

            //האוביקט שנשלח ל-OpenAI API
            var requestBody = new
            {
                model = "text-davinci-003",
                prompt = fullRequestForAi, 
                max_tokens = 150
            };

            //שליחת הבקשה וקבלת התשובה
            try{
                var response = await httpClient.PostAsJsonAsync("https://api.openai.com/v1/completions", requestBody);
                Console.WriteLine("OpenAI API Response Status: " + response.StatusCode);               
                var responseContent = await response.Content.ReadFromJsonAsync<OpenAIResponse>();            
                if (responseContent?.choices == null || !responseContent.choices.Any())
                {
                    return StatusCode(502, "Invalid response from OpenAI API.");
                }
                return Ok(responseContent.choices.First().text.Trim());
            }
            catch(Exception ex)
            {
                Console.WriteLine("Exception when calling OpenAI API: " + ex.Message);
                return dummyLesson();//הצגת שיעור דמה במקרה של כשלון
            }
        }
    }

    // מחלקות עזר לתמלול התשובה מ-OpenAI
    public class OpenAIResponse
    {
        public string id { get; set; }
        public string @object { get; set; }
        public long created { get; set; }
        public string model { get; set; }
        public List<Choice> choices { get; set; }
        public Usage usage { get; set; }
    }

    public class Choice
    {
        public string text { get; set; }
        public int index { get; set; }
        public object logprobs { get; set; }
        public string finish_reason { get; set; }
    }

    public class Usage
    {
        public int prompt_tokens { get; set; }
        public int completion_tokens { get; set; }
        public int total_tokens { get; set; }
    }
}
