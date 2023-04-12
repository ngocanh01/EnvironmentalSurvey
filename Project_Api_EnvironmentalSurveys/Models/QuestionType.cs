using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class QuestionType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Question> Questions { get; } = new List<Question>();
}
