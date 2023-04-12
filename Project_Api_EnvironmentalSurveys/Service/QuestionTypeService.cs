using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface QuestionTypeService
    {
        public dynamic Findall();
        public dynamic FindById(int id);
        public bool Create(QuestionType questionType);
        public bool Update(QuestionType questionType);
        public bool Delete(int id);
    }
}
