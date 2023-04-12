using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface RoleService
    {
        public dynamic Findall();
        public bool Create(Role role);
        public bool Update(Role role);
        public bool Delete(int id);
        public dynamic FindById(int id);
        public dynamic FindById2(int id);

    }
}
