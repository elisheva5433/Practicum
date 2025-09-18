using System;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;


namespace models
{
    public class Prompt
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public string PromptText { get; set; }
        public string Response { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}