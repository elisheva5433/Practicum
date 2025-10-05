using System.Collections.Generic;
using MongoDB.Driver;
using interfaces;
using models;
using DATA;
namespace services

{
    public class UserService:IUserService
    {
        private readonly List<User> _users;
        private readonly IDbContext _context;

        public UserService(IDbContext context)
        {
            _context = context;
       
        }
       
        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.Find(_ => true).ToListAsync();
        }

        public async Task<User> GetUserById(string id)
        {
               return await _context.Users.Find(user => user.Id == id).FirstOrDefaultAsync();
        }
        
        public async Task<User> GetUserByName(string name)
        {
           return await _context.Users.Find(user => user.Name.Equals(name, StringComparison.OrdinalIgnoreCase)).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByPhone(string phone)
        {
           return await _context.Users.Find(user => user.Phone == phone).FirstOrDefaultAsync();
        }

        public async Task CreateUser(User user)
        {
            await _context.Users.InsertOneAsync(user);
        }

        public async Task DeleteUser(string id)
        {
            // int id2 = int.Parse(id); // או TryParse אם זה לא בטוח תמיד מספר
            await _context.Users.DeleteOneAsync(user => user.Id == id);
        }

        public async Task UpdateUser(string id, User updatedUser)
        {
            // int id = int.Parse(idString);
            await _context.Users.ReplaceOneAsync(user => user.Id == id, updatedUser);
        }
    }
}
