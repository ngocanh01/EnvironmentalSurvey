using Project_Api_EnvironmentalSurveys.Models;
using System.Diagnostics;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class AnswerServiceImpl : AnswerService
    {
        private DatabaseContext database;
        public AnswerServiceImpl(DatabaseContext _database)
        {
            database = _database;
        }

        public bool Create(Answer answer)
        {
            try
            {
                database.Answers.Add(answer);
                return database.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            database.Remove(database.Answers.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.Answers.Select(a => new
            {
                id = a.Id,
                responseId = a.ResponseId,
                answer = a.Answer1
            }).ToList();
        }

        public dynamic FindByResId(int id)
        {
            return database.Answers.Where(a => a.ResponseId == id).Select(a => new
            {
                id = a.Id,
                responseId = a.ResponseId,
                question = a.Question,
                answer = a.Answer1
            }).ToList();
        }

        public bool Update(Answer answer)
        {
            database.Entry(answer).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }
    }
}
