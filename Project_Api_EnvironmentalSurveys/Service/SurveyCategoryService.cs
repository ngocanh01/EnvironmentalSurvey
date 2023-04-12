using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface SurveyCategoryService
    {
        public dynamic Findall();
        public dynamic FindById(int id);
        public bool Create(SurveyCategory surveyCategory);
        public bool Update(SurveyCategory surveyCategory);
        public bool Delete(int id);

    }
}
