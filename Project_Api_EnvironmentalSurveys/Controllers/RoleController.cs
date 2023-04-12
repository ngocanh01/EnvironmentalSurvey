using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/role")]
    public class RoleController : Controller
    {
        private RoleService roleService;
        public RoleController(RoleService _roleService)
        {
            this.roleService = _roleService;
        }

        [Produces("application/json")]
        [HttpGet("findallrole")]
        public IActionResult Findallrole()
        {
            try
            {
                return Ok(roleService.Findall());
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createrole")]
        public IActionResult Createrole([FromBody] Role role)
        {
            try
            {
                return Ok(new
                {
                    Result = roleService.Create(role)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delrole/{id}")]
        public IActionResult Delrole(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = roleService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editrole")]
        public IActionResult Editrole([FromBody] Role role)
        {
            try
            {
                return Ok(new
                {
                    Result = roleService.Update(role)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("findid/{id}")]
        public IActionResult findbyID(int id)
        {
            try
            {
                return Ok(roleService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
