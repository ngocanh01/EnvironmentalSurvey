using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class Response
{
    public int Id { get; set; }

    public int SurveyId { get; set; }

    public int UserId { get; set; }

    public int? Score { get; set; }

    public DateTime? Created { get; set; }

    public virtual ICollection<Answer> Answers { get; } = new List<Answer>();

    public virtual Survey Survey { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
