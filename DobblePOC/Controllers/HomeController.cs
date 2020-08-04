using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text;

namespace DobblePOC.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(ILogger<HomeController> logger, IApplicationManager gameManager)
        {

        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult NewGame()
        {
            const int idLength = 5;
            string randomId = RandomId(idLength);

            return View(randomId);





            static string RandomId(int length)
            {
                const string src = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var sb = new StringBuilder();
                Random Random = new Random();
                for (var i = 0; i < length; i++)
                {
                    var c = src[Random.Next(0, src.Length)];
                    sb.Append(c);
                }
                return sb.ToString();
            }
        }

        [HttpGet]
        public IActionResult JoinGame()
        {
            return View();
        }
    }
}
