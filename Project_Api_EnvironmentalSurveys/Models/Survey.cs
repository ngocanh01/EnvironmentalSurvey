using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class Survey
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string Type { get; set; } = null!;

    public bool Status { get; set; }

    public int SurveyCategoryId { get; set; }

    public virtual ICollection<Question> Questions { get; } = new List<Question>();

    public virtual ICollection<Response> Responses { get; } = new List<Response>();

    public virtual SurveyCategory SurveyCategory { get; set; } = null!;
}
