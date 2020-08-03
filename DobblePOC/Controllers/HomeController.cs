using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DobblePOC.Models;
using DobbleCardsGameLib;

namespace DobblePOC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public DobbleCardsGame DobbleCardsGame { get; set; }
        public DobbleCard CentralDobbleCard { get; set; }
        public int IndexCentralStack { get; set; }

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult Touch(int playerId, int valueTouch, int indexCentralStack, string guidGame, TimeSpan timeTakenToTouch)
        {
            CentralDobbleCard = new DobbleCard(new List<int> { 1, 2, 3, 4, 5, 6, 7, 8 }); // todo CentralDobbleCard change value

            if (true) // todo check indexCentralStack == IndexCentralStack "session"
            {
                if (CentralDobbleCard.Values.Any(value => value == valueTouch))
                {
                    IndexCentralStack++;
                    return new JsonResult("Ok");
                }
                else
                {
                    return new JsonResult("Not good value");
                }
            }

            return new JsonResult("ToLate");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
