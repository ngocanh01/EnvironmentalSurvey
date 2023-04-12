using Microsoft.AspNetCore.Mvc;
using Project_Api_EnvironmentalSurveys.Models;
using Project_Api_EnvironmentalSurveys.Service;

namespace Project_Api_EnvironmentalSurveys.Controllers
{
    [Route("api/user")]
    public class AccountController : Controller
    {
        private AccountService accountService;
        private RoleService roleService;
        public AccountController(AccountService _accountService, RoleService _roleServcie)
        {
            this.accountService = _accountService;
            this.roleService = _roleServcie;
        }
        [Produces("application/json")]
        [HttpGet("findallAcc")]
        public IActionResult FindallAcc()
        {
            try
            {
                return Ok(accountService.Findall());
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("createAcc/{id}")]
        public IActionResult CreateAcc([FromBody] User user, int id)
        {

            user.Roles.Add(roleService.FindById2(id));
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            try
            {
                return Ok(new
                {
                    Result = accountService.Create(user)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpDelete("delAcc/{id}")]
        public IActionResult DelAcc(int id)
        {

            try
            {
                return Ok(new
                {
                    Result = accountService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("editAcc/{id}")]
        public IActionResult EditAcc([FromBody] User user, int id)
        {
            //user.Roles.Clear();
            user.Roles.Add(roleService.FindById2(id));
            //user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            try
            {
                return Ok(new
                {
                    Result = accountService.Update(user)
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
                return Ok(accountService.FindById(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("checkuser/{user}")]
        public IActionResult checkuser(string user)
        {
            try
            {
                return Ok(accountService.findUsername(user));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [HttpGet("finduser/{user}")]
        public IActionResult finduser(string user)
        {
            try
            {
                return Ok(accountService.FindUser(user));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("Login")]
        public IActionResult Login([FromBody] User user)
        {
            try
            {
                return Ok(new
                {
                    Results = accountService.login(user.Username, user.Password) 
                });
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
