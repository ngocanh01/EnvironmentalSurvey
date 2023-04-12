using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class SurveyCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Survey> Surveys { get; } = new List<Survey>();
}
