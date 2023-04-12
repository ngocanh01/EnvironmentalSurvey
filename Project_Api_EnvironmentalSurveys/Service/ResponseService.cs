using Project_Api_EnvironmentalSurveys.Models;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public interface ResponseService
    {
        public dynamic FindAll();
        public bool Delete(int id);
        public int Create(Response response);
    }
}
