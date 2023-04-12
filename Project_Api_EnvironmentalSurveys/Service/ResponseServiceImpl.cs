using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class ResponseServiceImpl : ResponseService
    {
        private DatabaseContext database;
        public ResponseServiceImpl(DatabaseContext _database)
        {
            database = _database;
        }

        public int Create(Response response)
        {
            database.Responses.Add(response);
            bool success = database.SaveChanges() > 0;

            if (success)
            {
                return response.Id;
                // use the responseId to do something with the newly created response
            }
            return -1;
        }

        public bool Delete(int id)
        {
            database.Remove(database.Responses.Find(id));
            return database.SaveChanges() > 0;
        }

        public dynamic FindAll()
        {
            return database.Responses.Select(r => new
            {
                id = r.Id,
                surveyId = r.SurveyId,
                surveyName = r.Survey.Title,
                userId = r.UserId,
                userName = r.User.Name,
                created = r.Created
            }).ToList();
        }
    }
}

