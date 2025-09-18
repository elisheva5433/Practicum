using models;
using interfaces;
using services;
using DATA;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("MongoDB");
var databaseName = builder.Configuration.GetValue<string>("DatabaseName");

// הזרקת תלות עבור ה-DbContext והממשק
builder.Services.AddSingleton<IDbContext>(s =>
    new DbContext(connectionString, databaseName));

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

// builder.Services.AddSingleton<IDbContext, DbContext>();

builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<ICategoriesService, CategoriesService>();
builder.Services.AddSingleton<ISubCategoriesService, SubCategoriesService>();
builder.Services.AddSingleton<IPromptsService, PromptsService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseCors("AllowSpecificOrigin"); // יש להוסיף את השורה הזו
app.UseAuthorization();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
