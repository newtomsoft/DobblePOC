using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DobbleCardsGameLib;
using Microsoft.AspNetCore.Mvc;

namespace DobblePOC.Controllers
{
    public class GameController : Controller
    {
        private IApplicationManager ApplicationManager { get; }

        public GameController(IApplicationManager applicationManager) => ApplicationManager = applicationManager;

        [HttpPost]
        public IActionResult Join(string gameId, int picturesNumber)
        {
            ApplicationManager.UseGameManager(gameId, picturesNumber);
            return Ok();
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Start(string gameId, int picturesNumber)
        {
            ApplicationManager.GamesManager[gameId].DistributeCards(new DobbleCardsGame(picturesNumber).Cards);
            //todo revoir appel sans passer picturesNumber déjà connu par GamesManager
            return new JsonResult(ApplicationManager.GamesManager[gameId].GetCenterCard());
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

        [HttpPost]
        public JsonResult AddNewPlayer(string gameId)
        {
            int picturesNumber = ApplicationManager.UseGameManager(gameId);
            string playerGuid = ApplicationManager.GamesManager[gameId].GetNewPlayer();
            return new JsonResult(new { playerGuid, picturesNumber });
        }

        [HttpPost]
        public JsonResult Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch)
        {
            if (cardPlayed != ApplicationManager.GamesManager[gameId].GetCurrentCard(playerGuid))
                return new JsonResult(new { answerStatus = AnswerStatus.CardPlayedDontExist });

            if (centerCard != ApplicationManager.GamesManager[gameId].GetCenterCard())
                return new JsonResult(new { answerStatus = AnswerStatus.ToLate });

            if (centerCard.Values.Any(value => value == valueTouch))
            {
                ApplicationManager.GamesManager[gameId].SetCenterCard(cardPlayed);
                if (ApplicationManager.GamesManager[gameId].IncreaseCardsCurrentIndex(playerGuid))
                {
                    ApplicationManager.FreeGameManager(gameId);
                    return new JsonResult(new { answerStatus = AnswerStatus.Ok, gameFinish = true });
                }

                return new JsonResult(new { answerStatus = AnswerStatus.Ok, centerCard = ApplicationManager.GamesManager[gameId].GetCenterCard() });
            }

            return new JsonResult(new { answerStatus = AnswerStatus.WrongValueTouch });

        }
    }
}
