namespace Project_Api_EnvironmentalSurveys.ViewModels
{
    public class SurveyViewModel
    {
        public int UserId { get; set; }
        public int SurveyId { get; set; }
        public string SurveyName { get; set; }
        public List<QuestionViewModel> Questions { get; set; }      
    }
    public class QuestionViewModel
    {
        public int QuestionId { get; set; }
        public string QuestionName { get; set; }
        public int QuestionTypeId { get; set; }
        public bool IsMandatory { get; set; }
        public List<OptionViewModel> Options { get; set; }
    }
    public class OptionViewModel
    {
        public int OptionId { get; set; }
        public string OptionName { get; set; }
        public bool IsSelected { get; set; }
    }
}

