using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;
using Project_Api_EnvironmentalSurveys.ViewModels;
using Project_Api_EnvironmentalSurveys.Converters;
using System.Globalization;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/answer")]
    public class AnswerController : Controller
    {
        private AnswerService answerService;
        private ResponseService responseService;
        public AnswerController(AnswerService _answerService, ResponseService _responseService)
        {
            answerService = _answerService;
            responseService = _responseService;
        }

        [Produces("application/json")]
        [HttpGet("findallanswer")]
        public IActionResult Findallanswer()
        {
            try
            {
                return Ok(answerService.Findall());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbyresid/{id}")]
        public IActionResult FindByResId(int id)
        {
            try
            {
                return Ok(answerService.FindByResId(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createanswer")]
        public IActionResult Createanswer([FromBody] Answer answer)
        {
            try
            {
                return Ok(new
                {
                    Result = answerService.Create(answer)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delanswer/{id}")]
        public IActionResult Delanswer(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = answerService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editanswer")]
        public IActionResult Editanswer([FromBody] Answer answer)
        {
            try
            {
                return Ok(new
                {
                    Result = answerService.Update(answer)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("getForm")]
        public IActionResult getForm([FromBody] SurveyViewModel anser)
        {
            try
            {
                Response response = new Response();
                response.UserId = anser.UserId;
                response.SurveyId = anser.SurveyId;
                response.Created = DateTime.Now;
                int id = responseService.Create(response);
                if(id <  0) {
                    return BadRequest();
                }
                string jsonString = JsonSerializer.Serialize(anser);
                anser = JsonSerializer.Deserialize<SurveyViewModel>(jsonString);

                foreach (var q in anser.Questions)
                {
                    Answer answer = new Answer();
                    answer.ResponseId = id;
                    List<string> cbOption = new List<string>();
                    answer.Question = q.QuestionName;
                    // checkbox
                    if (q.QuestionTypeId == 1)
                    {
                        foreach (var o in q.Options)
                        {
                            if (o.IsSelected == true)
                            {
                                cbOption.Add(o.OptionName);
                            }
                        }
                    }
                    // radio
                    if (q.QuestionTypeId == 2)
                    {
                        foreach (var o in q.Options)
                        {

                            if (o.IsSelected == true)
                            {
                                cbOption.Add(o.OptionName);
                            }
                        }
                    }
                    if (q.QuestionTypeId == 4)
                    {
                        foreach (var o in q.Options)
                        {

                            cbOption.Add(o.OptionName);
                        }
                    }

                    if (q.QuestionTypeId == 1) {
                        string result = cbOption.Aggregate("", (current, s) => current + (s + ","));
                        answer.Answer1 = result;    
                    } else
                    {
                        string result = cbOption.Aggregate("", (current, s) => current + (s));
                        answer.Answer1 = result;
                    }

                    Debug.WriteLine("response id: " + answer.ResponseId);
                    Debug.WriteLine("question name: " + answer.Question);
                    Debug.WriteLine("answer id: " + answer.Answer1);
                    answerService.Create(answer);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
