using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class QuestionOption
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public string? Value { get; set; }

    public int? Score { get; set; }

    public virtual Question Question { get; set; } = null!;
}
