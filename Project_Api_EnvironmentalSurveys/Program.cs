using Microsoft.EntityFrameworkCore;
using Project_Api_EnvironmentalSurveys.Converters;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();

//Connect to DB
var connectionStrings = builder.Configuration["ConnectionString"] ;
builder.Services.AddDbContext<DatabaseContext>(option => option.UseLazyLoadingProxies().UseSqlServer(connectionStrings));


builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.Converters.Add(new DatetimeConverter());
});

builder.Services.AddControllersWithViews()
                .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddHostedService<MyBackgroundService>();
builder.Services.AddControllers();
builder.Services.AddScoped<SurveyCategoryService, SurveyCategoryServiceImpl>();
builder.Services.AddScoped<QuestionTypeService, QuestionTypeServiceImpl>();
builder.Services.AddScoped<AccountService, AccountServiceImpl>();
builder.Services.AddScoped<RoleService, RoleServiceImpl>();
builder.Services.AddScoped<AnswerService, AnswerServiceImpl>();
builder.Services.AddScoped<QuestionOptionService, QuestionOptionServiceImpl>();
builder.Services.AddScoped<QuestionsService, QuestionsServiceImpl>();
builder.Services.AddScoped<ResponseService, ResponseServiceImpl>();
builder.Services.AddScoped<SurveysService, SurveysServiceImpl>();

var app = builder.Build();

app.UseCors(builder => builder.AllowAnyHeader()
                              .AllowAnyMethod()
                              .SetIsOriginAllowed((host) => true)
                              .AllowCredentials());

app.UseStaticFiles();
app.MapControllers();


app.Run();
