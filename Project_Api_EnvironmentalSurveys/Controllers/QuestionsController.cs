using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/question")]
    public class QuestionsController : Controller
    {
        private QuestionsService questionsService;
        public QuestionsController(QuestionsService _questionsService)
        {
            this.questionsService = _questionsService;
        }

        [Produces("application/json")]
        [HttpGet("findallquestion")]
        public IActionResult Findallquestion()
        {
            try
            {
                return Ok(questionsService.Findall());
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
                return Ok(questionsService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbysurveyid/{id}")]
        public IActionResult FindBySurveyId(int id)
        {
            try
            {
                return Ok(questionsService.FindBySurveyId(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findthenewest")]
        public IActionResult FindTheNewest()
        {
            try
            {
                return Ok(questionsService.FindTheNewest());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createquestion")]
        public IActionResult Createquestion([FromBody] Question question)
        {
            try
            {
                return Ok(new
                {
                    Result = questionsService.Create(question)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delquestion/{id}")]
        public IActionResult Delquestion(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = questionsService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editquestion")]
        public IActionResult Editquestion([FromBody] Question question)
        {
            try
            {
                return Ok(new
                {
                    Result = questionsService.Update(question)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
