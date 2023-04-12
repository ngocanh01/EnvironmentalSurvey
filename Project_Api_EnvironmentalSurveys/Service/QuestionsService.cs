using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface QuestionsService
    {
        public dynamic Findall();
        public dynamic FindById(int id);
        public dynamic FindBySurveyId(int id);
        public dynamic FindTheNewest();
        public bool Create(Question question);
        public bool Update(Question question);
        public bool Delete(int id);
    }
}
