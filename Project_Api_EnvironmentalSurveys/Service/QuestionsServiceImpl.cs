using Project_Api_EnvironmentalSurveys.Models;
using System.Xml.Linq;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class QuestionsServiceImpl : QuestionsService
    {
        private DatabaseContext database;
        public QuestionsServiceImpl(DatabaseContext _database)
        {
            this.database = _database;
        }

        public bool Create(Question question)
        {
            database.Questions.Add(question);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            database.Remove(database.Questions.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
            return database.Questions.Select(q => new
            {
                id = q.Id,
                surveyId = q.SurveyId,
                surveyName = q.Survey.Title,
                questiontypeId = q.QuestionTypeId,
                questiontypeName = q.QuestionType.Name,
                questionText = q.QuestionText,
                isMandatory = q.IsMandatory,
                questionOption = database.QuestionOptions.Where(qO => qO.QuestionId == q.Id).Select(qO => new 
                {
                    option = qO.Value
                }).ToList()
            }).ToList();

        //    return database.Questions
        //.Join(
        //    database.QuestionOptions,
        //    q => q.Id,
        //    qO => qO.QuestionId,
        //    (q, qO) => new
        //    {
        //        QuesttionId = q.Id,
        //        QuestionText = q.QuestionText,
        //        SurveyId = q.Survey.Id,
        //        SurveyName = q.Survey.Title,
        //        TypeId = q.QuestionType.Id,
        //        TypeName = q.QuestionType.Name,
        //        QuestionOption = new
        //        {
        //            qO.Value
        //        }

        //    }
        //).GroupBy(qO => qO.QuesttionId).ToList();
        }

        public dynamic FindById(int id)
        {
            return database.Questions.Where(q => q.Id == id).Select(q => new
            {
                id = q.Id,
                surveyId = q.SurveyId,
                surveyName = q.Survey.Title,
                questiontypeId = q.QuestionTypeId,
                questiontypeName = q.QuestionType.Name,
                questionText = q.QuestionText,
                isMandatory = q.IsMandatory,
                
            }).FirstOrDefault();
        }

        public dynamic FindBySurveyId(int id)
        {
            return database.Questions.Where(q => q.SurveyId == id).Select(q => new
            {
                questionId = q.Id,
                questiontypeId = q.QuestionTypeId,
                type = q.QuestionType.Name,
                questionText = q.QuestionText,
                options = database.QuestionOptions.Where(o => o.QuestionId == q.Id).Select(o => new
                {
                    id = o.Id,
                    option = o.Value
                }).ToList()
            }).ToList();
        }

        public dynamic FindTheNewest()
        {

            return database.Questions.Select(q => new
            {
                id = q.Id,
                surveyId = q.SurveyId,
                surveyName = q.Survey.Title,
                questiontypeId = q.QuestionTypeId,
                questiontypeName = q.QuestionType.Name,
                questionText = q.QuestionText,
                isMandatory = q.IsMandatory,

            }).OrderByDescending(q => q.id).FirstOrDefault();
        }

        public bool Update(Question question)
        {
            database.Entry(question).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }
    }
}
