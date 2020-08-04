using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DobbleCardsGameLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DobblePOC.Controllers
{
    public class GameController : Controller
    {
        private const int NUMBER_OF_SYMBOLS = 3;
        private readonly ILogger<GameController> _logger;

        private IApplicationManager ApplicationManager { get; }
        private string GameId { get; set; }

        public GameController(ILogger<GameController> logger, IApplicationManager applicationManager)
        {
            _logger = logger;
            ApplicationManager = applicationManager;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult StartGame(string gameId)
        {
            ApplicationManager.GamesManager[gameId].AddCardsToGame(new DobbleCardsGame(NUMBER_OF_SYMBOLS).Cards);
            return new JsonResult("Ok");
        }

        [HttpGet]
        public JsonResult GetCardsPlayer(string gameId, string playerGuid)
        {
            List<DobbleCard> cards = ApplicationManager.GamesManager[gameId].GetCards(playerGuid);
            return new JsonResult(cards);
        }


        [HttpGet]
        public JsonResult GetCenterCard(string gameId)
        {
            return new JsonResult(ApplicationManager.GamesManager[gameId].GetCenterCard());
        }

        [HttpGet]
        public JsonResult GetNewPlayerGuid(string gameId)
        {
            ApplicationManager.UseGameManager(gameId);
            return new JsonResult(ApplicationManager.GamesManager[gameId].GetNewPlayer());
        }

        [HttpPost]
        public JsonResult Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, string guidGame, TimeSpan timeTakenToTouch)
        {
            if (cardPlayed != ApplicationManager.GamesManager[gameId].GetCurrentCard(playerGuid))
                return new JsonResult(new { answerStatus = AnswerStatus.CardPlayedDontExist });

            if (centerCard != ApplicationManager.GamesManager[gameId].GetCenterCard())
                return new JsonResult(new { answerStatus = AnswerStatus.ToLate });

            if (centerCard.Values.Any(value => value == valueTouch))
            {
                ApplicationManager.GamesManager[gameId].SetCenterCard(cardPlayed);
                if (ApplicationManager.GamesManager[gameId].IncreaseCardsCurrentIndex(playerGuid))
                    return new JsonResult(new { answerStatus = AnswerStatus.Ok, gameFinish = true });

                return new JsonResult(new { answerStatus = AnswerStatus.Ok, centerCard = ApplicationManager.GamesManager[gameId].GetCenterCard() });
            }

            return new JsonResult(new { answerStatus = AnswerStatus.WrongValueTouch });

        }
    }
}
