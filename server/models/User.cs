using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }

    }
}