using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface AccountService
    {
        public dynamic Findall();
        public bool Create(User user);
        public bool Update(User user);
        public bool Delete(int id);
        public dynamic FindById(int id);
        public bool findUsername(string username);
        public bool login(string username,string password);
        public dynamic FindUser(string username);
    }
}
