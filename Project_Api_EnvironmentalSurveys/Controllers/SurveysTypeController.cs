using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;
using System.Diagnostics;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/surveytype")]
    public class SurveysTypeController : Controller
    {
        private IWebHostEnvironment env;
        private SurveyCategoryService surveyCategoryService;
        public SurveysTypeController(IWebHostEnvironment env, SurveyCategoryService _surveyCategoryService)
        {
            this.env = env;
            this.surveyCategoryService = _surveyCategoryService;
        }

        [Produces("application/json")]
        [HttpGet("findallCate")]
        public IActionResult FindallCate()
        {
            try
            {
                return Ok(surveyCategoryService.Findall());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbyid/{id}")]
        public IActionResult FindById(int id)
        {
            try
            {
                return Ok(surveyCategoryService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createCate")]
        public IActionResult CreateCate([FromBody] SurveyCategory surveyCategory)
        {
            try
            {
                return Ok(new
                {
                    Result = surveyCategoryService.Create(surveyCategory)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delCate/{id}")]
        public IActionResult DelCate(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = surveyCategoryService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editCate")]
        public IActionResult EditCate([FromBody] SurveyCategory surveyCategory)
        {
            try
            {
                return Ok(new
                {
                    Result = surveyCategoryService.Update(surveyCategory)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
