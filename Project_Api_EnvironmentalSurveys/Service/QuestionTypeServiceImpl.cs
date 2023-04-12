using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class QuestionTypeServiceImpl : QuestionTypeService
    {
        private DatabaseContext database;
        public QuestionTypeServiceImpl(DatabaseContext _database)
        {
            this.database = _database;
        }

        public bool Create(QuestionType questionType)
        {
            database.QuestionTypes.Add(questionType);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            database.Remove(database.QuestionTypes.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.QuestionTypes.Select(q => new
            {
                id = q.Id,
                name = q.Name
            }).ToList();
        }

        public dynamic FindById(int id)
        {
            return database.QuestionTypes.Where(s => s.Id == id).Select(s => new
            {
                Id = s.Id,
                Name = s.Name
            }).FirstOrDefault();
        }

        public bool Update(QuestionType questionType)
        {
            database.Entry(questionType).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }
    }
}
