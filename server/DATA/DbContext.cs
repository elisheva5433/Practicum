using MongoDB.Driver;
using models;
// using DATA;
namespace DATA
{
public class DbContext:IDbContext
{
    private readonly IMongoDatabase  _database;

    public DbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

      public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<Category> Categories => _database.GetCollection<Category>("Categories"); // שמתי נכון את השם
        public IMongoCollection<SubCategory> SubCategories => _database.GetCollection<SubCategory>("SubCategories");
        public IMongoCollection<Prompt> Prompts => _database.GetCollection<Prompt>("Prompts");


    // public IMongoCollection<T> GetCollection<T>(string collectionName)
    // {
    //     return _database.GetCollection<T>(collectionName);
    // }
}
}



