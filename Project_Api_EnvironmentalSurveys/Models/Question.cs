using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class Question
{
    public int Id { get; set; }

    public int SurveyId { get; set; }

    public int QuestionTypeId { get; set; }

    public string QuestionText { get; set; } = null!;

    public bool IsMandatory { get; set; }

    public virtual ICollection<QuestionOption> QuestionOptions { get; } = new List<QuestionOption>();

    public virtual QuestionType QuestionType { get; set; } = null!;

    public virtual Survey Survey { get; set; } = null!;
}
