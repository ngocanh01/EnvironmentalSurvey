using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/survey")]
    public class SurveysController : Controller
    {
        private SurveysService surveysService;
        private readonly IHttpContextAccessor httpContextAccessor;
        public SurveysController(SurveysService _surveysService, IHttpContextAccessor _httpContextAccessor)
        {
            surveysService = _surveysService;
            httpContextAccessor = _httpContextAccessor;
        }

        [Produces("application/json")]
        [HttpGet("findallSurveys")]
        public IActionResult FindallSurveys()
        {
            try
            {
                return Ok(surveysService.Findall());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findallSurveys2")]
        public IActionResult FindallSurveys2()
        {
            try
            {
                return Ok(surveysService.Findall2());
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
                return Ok(surveysService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbycate/{id}")]
        public IActionResult FindByCate(int id)
        {
            try
            {
                return Ok(surveysService.FindByCate(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getSurveyById/{id}")]
        public IActionResult GetSurveyById(int id)
        {
            try
            {
                return Ok(surveysService.GetSurveyById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("getSurveyIsNotImpl")]
        public IActionResult GetSurveyIsNotImpl()
        {
            try
            {
                string userId = httpContextAccessor.HttpContext.Session.GetString("userId");

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createsurvey")]
        public IActionResult Createsurvey([FromBody] Survey surveys)
        {
            try
            {
                return Ok(new
                {
                    Result = surveysService.Create(surveys)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delsurvey/{id}")]
        public IActionResult Delsurvey(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = surveysService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editsurvey")]
        public IActionResult Editsurvey([FromBody] Survey surveys)
        {
            try
            {
                return Ok(new
                {
                    Result = surveysService.Update(surveys)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
