using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class AccountServiceImpl : AccountService
    {
        private DatabaseContext database;
        private RoleService roleService;
        public AccountServiceImpl(DatabaseContext _database, RoleService _roleService)
        {
            roleService = _roleService;
            this.database = _database;
        }

        public bool Create(User user)
        {
            database.Users.Add(user);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            var user = database.Users.Find(id);
            user.Roles.Clear();
            database.Users.Remove(user);
            return database.SaveChanges() > 0;
        }

        public bool Update(User user)
        {
            user.Roles.Clear();
            database.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.Users.Select(u => new
            {
                id = u.Id,
                name = u.Name,
                email = u.Email,
                username = u.Username,
                password = u.Password,
                status = u.Status,
                //role = database.Roles.Find(u.Id).Name
            }).ToList();
        }

        public dynamic FindById(int id)
        {
            return database.Users.Where(u => u.Id == id).Select(u => new
            {
                id = u.Id,
                name = u.Name,
                email = u.Email,
                username = u.Username,
                password = u.Password,
                status = u.Status,
                role = u.Roles.Select(r => r.Id)
            }).FirstOrDefault();
        }

        public dynamic FindUser(string username)
        {
            return database.Users.Where(u => u.Username == username).Select(u => new
            {
                id = u.Id,
                name = u.Name,
                email = u.Email,
                username = u.Username,
                password = u.Password,
                status = u.Status,
                role = u.Roles.Select(u => u.Name).FirstOrDefault()
            }).FirstOrDefault();
        }

        public bool findUsername(string username)
        {
            var user = database.Users.Any(u => u.Username == username || u.Email == username);
            if (user)
            {
                return false;
            }
            return true;
        }

        public bool login(string username, string password)
        {
            var user = database.Users.SingleOrDefault(u => u.Username == username);
            if (user != null)
            {
                return BCrypt.Net.BCrypt.Verify(password, user.Password) && user.Status;
            }
            return false;
        }

      
    }
}
