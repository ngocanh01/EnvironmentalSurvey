using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class RoleServiceImpl : RoleService
    {
        private DatabaseContext database;
        public RoleServiceImpl(DatabaseContext _database)
        {
            this.database = _database;
        }

        public bool Create(Role role)
        {
            database.Roles.Add(role);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            database.Remove(database.Roles.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.Roles.Select(r => new
            {
                id = r.Id,
                name = r.Name
            }).ToList();
        }

        public dynamic FindById(int id)
        {
            return database.Roles.Where(r => r.Id == id).Select(r => new
            {
                id = r.Id,
                name = r.Name
            }).FirstOrDefault();
            //return database.Roles.Find(id);
        }
        public dynamic FindById2(int id)
        {
            return database.Roles.Find(id);
        }

        public bool Update(Role role)
        {
            database.Entry(role).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }
    }
}
