using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.ViewModels;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class SurveysServiceImpl : SurveysService
    {
        private DatabaseContext database;
        public SurveysServiceImpl(DatabaseContext _database)
        {
            this.database = _database;
        }

        public bool Create(Survey survey)
        {
            database.Surveys.Add(survey);
            return database.SaveChanges() > 0;
        }

        public bool Delete(int id)
        {
            database.Remove(database.Surveys.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic Findall()
        {
           return database.Surveys.Select(s => new
           {
              id = s.Id,
              title = s.Title,
              description = s.Description,
              startdate = s.StartDate,
              enddate = s.EndDate,
              type = s.Type,
              status = s.Status,
              surveyCategoryId = s.SurveyCategoryId,
              surveyCategoryName = s.SurveyCategory.Name,
           
           }).ToList();
        }

        public bool Update(Survey survey)
        {
            database.Entry(survey).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return database.SaveChanges() > 0;
        }

        public dynamic FindById(int id)
        {
            return database.Surveys.Where(s => s.Id == id).Select(s => new
            {
                id = s.Id,
                title = s.Title,
                description = s.Description,
                startdate = s.StartDate,
                enddate = s.EndDate,
                type = s.Type,
                status = s.Status,
                surveyCategoryId = s.SurveyCategoryId,
                surveyCategoryName = s.SurveyCategory.Name
            }).FirstOrDefault();
        }

        public dynamic Findall2()
        {
            return database.Surveys.Where(s => s.Status == true).Select(s => new
            {
                id = s.Id,
                title = s.Title,
                description = s.Description,
                startdate = s.StartDate,
                enddate = s.EndDate,
                type = s.Type,
                status = s.Status,
                surveyCategoryId = s.SurveyCategoryId,
                surveyCategoryName = s.SurveyCategory.Name,
            }).ToList();
        }

        public SurveyViewModel GetSurveyById(int id)
        {
            var model = database.Surveys.Where(s => s.Id == id).Select(s => new SurveyViewModel
            {
                SurveyId = s.Id,
                SurveyName = s.Title,
                Questions = s.Questions.Select(q => new QuestionViewModel
                {
                    QuestionId = q.Id,
                    QuestionName = q.QuestionText,
                    QuestionTypeId = q.QuestionTypeId,
                    IsMandatory = q.IsMandatory,
                    Options = q.QuestionOptions.Select(o => new OptionViewModel
                    {
                        OptionId = o.Id,
                        OptionName = o.Value
                    }).ToList()
                }).ToList(),
            }).FirstOrDefault();

            if (model == null)
            {
                model = new SurveyViewModel();
            }

            return model;
        }

        public dynamic GetSurveyIsNotImpl()
        {
            var result = database.Surveys.GroupJoin(database.Responses, survey => survey.Id, response => response.SurveyId, (survey, response) => new { Survey = survey, Response = response }).Where(surveyResponse => !surveyResponse.Response.Any()).Select(surveyResponse => surveyResponse.Survey.Title);

            return result;
        }

        public dynamic FindByCate(int id)
        {
            return database.Surveys.Where(s => s.SurveyCategoryId == id).Select(s => new
            {
                id = s.Id,
                title = s.Title,
                description = s.Description,
                startdate = s.StartDate,
                enddate = s.EndDate,
                type = s.Type,
                status = s.Status,
                surveyCategoryId = s.SurveyCategoryId,
                surveyCategoryName = s.SurveyCategory.Name,
            }).ToList();
        }
    }
}
