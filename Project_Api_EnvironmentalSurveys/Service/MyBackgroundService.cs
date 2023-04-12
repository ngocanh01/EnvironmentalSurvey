using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Project_Api_EnvironmentalSurveys.Models;
using System.Diagnostics;

namespace Project_Api_EnvironmentalSurveys.Service
{
    public class MyBackgroundService : BackgroundService
    {
        private readonly ILogger<MyBackgroundService> _logger;
        private readonly IServiceProvider _serviceProvider;
      

        public MyBackgroundService(IServiceProvider serviceProvider,ILogger<MyBackgroundService> logger )
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                    _logger.LogInformation("Form MyBackgroundService : ExcuteAsyn");
                    var now = DateTime.Now;
                    var active = context.Surveys.Where(s => s.StartDate.Date <= now && s.EndDate > now && s.Type == "auto");
                    if (active != null)
                    {
                        foreach( var item in active)
                        {
                            item.Status = true;
                            
                        }
                        context.SaveChanges();
                    }
                    var unActive = context.Surveys.Where(s => s.StartDate.Date < now && s.EndDate < now && s.Type == "auto");
                    if (unActive != null)
                    {
                        foreach (var item in unActive)
                        {
                            item.Status = false;

                        }
                        context.SaveChanges();
                    }
                    //var endDate = context.Surveys.SingleOrDefault(s => s.EndDate.Date >= now);
                    //if (startDate != null)
                    //{
                    //    startDate.Status = false;
                    //    context.SaveChanges();
                    //}
                    await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                }
            }
           
        }
    }
}
