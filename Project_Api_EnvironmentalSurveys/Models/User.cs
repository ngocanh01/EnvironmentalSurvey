using System;
using System.Collections.Generic;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool Status { get; set; }

    public virtual ICollection<Response> Responses { get; } = new List<Response>();

    public virtual ICollection<Role> Roles { get; } = new List<Role>();
}
