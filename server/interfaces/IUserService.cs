using models;

namespace interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();
        Task<User> GetUserById(string id);
        Task<User> GetUserByName(string name);
        Task<User> GetUserByPhone(string phone);
        Task CreateUser(User user);  
        Task DeleteUser(string id);
        Task UpdateUser(string id, User updatedUser);
    }
}