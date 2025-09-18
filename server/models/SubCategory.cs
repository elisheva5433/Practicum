using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;


namespace models{
    public class SubCategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
    }
}