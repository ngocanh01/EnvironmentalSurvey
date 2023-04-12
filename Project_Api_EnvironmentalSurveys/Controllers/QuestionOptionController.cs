using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/questionOption")]
    public class QuestionOptionController : Controller
    {
        private QuestionOptionService questionOptionService;
        public QuestionOptionController(QuestionOptionService _questionOptionService)
        {
            this.questionOptionService = _questionOptionService;
        }

        [Produces("application/json")]
        [HttpGet("findallquesOption")]
        public IActionResult FindallquesOption()
        {
            try
            {
                return Ok(questionOptionService.Findall());
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
                return Ok(questionOptionService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbyquestionid/{id}")]
        public IActionResult FindByQuestionId(int id)
        {
            try
            {
                return Ok(questionOptionService.FindByQuestionId(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createquesOption")]
        public IActionResult CreatequesOption([FromBody] QuestionOption quesOption)
        {
            try
            {
                return Ok(new
                {
                    Result = questionOptionService.Create(quesOption)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delquesOption/{id}")]
        public IActionResult DelquesOption(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = questionOptionService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editquesOption")]
        public IActionResult EditquesOption([FromBody] QuestionOption quesOption)
        {
            try
            {
                return Ok(new
                {
                    Result = questionOptionService.Update(quesOption)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
