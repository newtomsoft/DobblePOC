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
        private ICardGuidGenerator CardGuidGenerator { get; }

        public HomeController(ILogger<HomeController> logger, ICardGuidGenerator cardGuidGenerator)
        {
            _logger = logger;
            CardGuidGenerator = cardGuidGenerator;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetGuidCentralCard()
        {
            return new JsonResult(CardGuidGenerator.GetCardGuid()) ;
        }

        [HttpPost]
        public JsonResult Touch(int playerId, int valueTouch, string cardGuid, string guidGame, TimeSpan timeTakenToTouch)
        {
            CentralDobbleCard = new DobbleCard(new List<int> { 1, 2, 3, 4, 5, 6, 7, 8 }); // todo CentralDobbleCard change value

            if (cardGuid == CardGuidGenerator.GetCardGuid())
            {
                if (CentralDobbleCard.Values.Any(value => value == valueTouch))
                {
                    return new JsonResult(new { answerStatus = AnswerStatus.Ok, cardGuid = CardGuidGenerator.NewCardGuid() });
                }
                else
                {
                    return new JsonResult(new { answerStatus = AnswerStatus.WrongValueTouch });
                }
            }

            return new JsonResult(new { answerStatus = AnswerStatus.ToLate });
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
