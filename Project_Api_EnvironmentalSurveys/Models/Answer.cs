using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class Answer
{
    public int Id { get; set; }

    public int ResponseId { get; set; }

    public string Question { get; set; } = null!;

    public string? Answer1 { get; set; }

    public virtual Response Response { get; set; } = null!;
}
