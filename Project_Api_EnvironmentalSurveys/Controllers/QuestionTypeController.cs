using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/questiontype")]
    public class QuestionTypeController : Controller
    {
        private IWebHostEnvironment env;
        private QuestionTypeService questionTypeService;
        public QuestionTypeController(IWebHostEnvironment _env, QuestionTypeService _questionTypeService)
        {
            this.env = _env;
            this.questionTypeService = _questionTypeService;
        }

        [Produces("application/json")]
        [HttpGet("findallquestiontype")]
        public IActionResult FindallQuestionType()
        {
            try
            {
                return Ok(questionTypeService.Findall());
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
                return Ok(questionTypeService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createquestionType")]
        public IActionResult CreatequestionType([FromBody] QuestionType questionType)
        {
            try
            {
                return Ok(new
                {
                    Result = questionTypeService.Create(questionType)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delquestionType/{id}")]
        public IActionResult DelquestionType(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = questionTypeService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editquestionType")]
        public IActionResult EditquestionType([FromBody] QuestionType questionType)
        {
            try
            {
                return Ok(new
                {
                    Result = questionTypeService.Update(questionType)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
