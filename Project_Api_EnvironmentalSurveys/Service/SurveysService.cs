using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.ViewModels;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface SurveysService
    {
        public dynamic Findall();
        public dynamic Findall2();
        public dynamic FindById(int id);
        public dynamic FindByCate(int id);
        public bool Create(Survey survey);
        public bool Update(Survey survey);
        public bool Delete(int id);
        public SurveyViewModel GetSurveyById(int id);
        public dynamic GetSurveyIsNotImpl();
    }
}
