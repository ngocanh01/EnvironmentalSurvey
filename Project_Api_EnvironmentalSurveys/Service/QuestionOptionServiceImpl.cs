using Microsoft.EntityFrameworkCore.Diagnostics;
using Project_Api_EnvironmentalSurveys.Models;
using System.Reflection.Metadata.Ecma335;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class QuestionOptionServiceImpl : QuestionOptionService
    {
        private DatabaseContext database;
        public QuestionOptionServiceImpl(DatabaseContext _database)
        {
            this.database = _database;
        }

        public bool Create(QuestionOption quesOption)
        {
            database.QuestionOptions.Add(quesOption);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            database.Remove(database.QuestionOptions.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.QuestionOptions.Select(q => new
            {
                id = q.Id,
                questionId = q.QuestionId,
                value = q.Value,
                score = q.Score,
                questionText = q.Question.QuestionText,
                typeId = q.Question.QuestionTypeId

            }).ToList();
        }

        public dynamic FindById(int id)
        {
            return database.QuestionOptions.Where(q => q.Id == id).Select(q => new
            {
                id = q.Id,
                questionId = q.QuestionId,
                value = q.Value,
                score = q.Score,
                questionText = q.Question.QuestionText
            }).FirstOrDefault();
        }

        public dynamic FindByQuestionId(int id)
        {
            return database.QuestionOptions.Where(o => o.QuestionId == id).Select(o => new
            {
                option = o.Value
            }).ToList();
        }

        public bool Update(QuestionOption quesOption)
        {
            database.Entry(quesOption).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }
    }
}
