using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface AnswerService
    {
        public dynamic Findall();
        public dynamic FindByResId(int id);
        public bool Create(Answer answer);
        public bool Update(Answer answer);
        public bool Delete(int id);
    }
}
