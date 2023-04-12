using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/response")]
    public class ResponseController : Controller
    {
        private ResponseService responseService;
        public ResponseController(ResponseService _responseService)
        {
            responseService = _responseService;
        }

        [Produces("application/json")]
        [HttpGet("findallresponse")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(responseService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("delresponse/{id}")]
        public IActionResult Delrole(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = responseService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createResponse")]
        public IActionResult CreateResponse([FromBody] Response response)
        {
            try
            {
                return Ok(responseService.Create(response));
              
            }
            catch
            {
                return BadRequest();
            }
        }
        //[Produces("application/json")]
        //[HttpGet("getLastest/{id}")]
        //public IActionResult GetLastest(int id)
        //{
        //    try
        //    {
        //        return Ok(responseService.getLastestResponse(id));
        //    }
        //    catch
        //    {
        //        return BadRequest();
        //    }
        //}
    }
}
