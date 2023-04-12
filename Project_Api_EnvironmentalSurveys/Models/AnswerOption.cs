using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class AnswerOption
{
    public int Id { get; set; }

    public int AnswerId { get; set; }

    public int QuestionOptionId { get; set; }

    public virtual Answer Answer { get; set; } = null!;

    public virtual QuestionOption QuestionOption { get; set; } = null!;
}
