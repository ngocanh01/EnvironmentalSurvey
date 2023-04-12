using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class SurveyCategoryServiceImpl : SurveyCategoryService
    {
        private DatabaseContext database;
        public SurveyCategoryServiceImpl(DatabaseContext _database)
        {
            database = _database;
        }
        public bool Create(SurveyCategory surveyCategory)
        {
            database.SurveyCategories.Add(surveyCategory);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            database.Remove(database.SurveyCategories.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.SurveyCategories.Select(s => new
            {
                id = s.Id,
                name = s.Name
            }).ToList();
        }

        public dynamic FindById(int id)
        {
            return database.SurveyCategories.Where(s => s.Id == id).Select(s => new
            {
                Id = s.Id,
                Name = s.Name
            }).FirstOrDefault();
        }

        public bool Update(SurveyCategory surveyCategory)
        {
            database.Entry(surveyCategory).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }
    }
}
