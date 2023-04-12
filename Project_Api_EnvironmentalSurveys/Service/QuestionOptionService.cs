using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface QuestionOptionService 
    {
        public dynamic Findall();
        public dynamic FindById(int id);
        public dynamic FindByQuestionId(int id);
        public bool Create(QuestionOption quesOption);
        public bool Update(QuestionOption quesOption);
        public bool Delete(int id);
        
    }
}
