using MongoDB.Driver;
using models;

namespace DATA
{
public interface IDbContext
{
        // IMongoCollection<T> GetCollection<T>(string collectionName);




    IMongoCollection<User> Users { get; }

    IMongoCollection<Category> Categories {get;}

    IMongoCollection<SubCategory> SubCategories { get; }

    IMongoCollection<Prompt> Prompts { get; }

}
}