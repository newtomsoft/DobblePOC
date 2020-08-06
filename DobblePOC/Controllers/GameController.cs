using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DobbleCardsGameLib;
using Microsoft.AspNetCore.Mvc;

namespace DobblePOC.Controllers
{
    public class GameController : Controller
    {
        private IApplicationManager ApplicationManager { get; }

        public GameController(IApplicationManager applicationManager) => ApplicationManager = applicationManager;

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(int picturesPerCard)
        {
            string gameId = ApplicationManager.CreateGameManager(picturesPerCard);
            return new JsonResult(new { gameId });
        }

        [HttpPost]
        public IActionResult Join(string gameId)
        {
            ApplicationManager.JoinGameManager(gameId);
            return new JsonResult(new { gameId });
        }

        [HttpPost]
        public JsonResult AddNewPlayer(string gameId)
        {
            int picturesPerCard = ApplicationManager.JoinGameManager(gameId);
            string playerGuid = ApplicationManager.GamesManager[gameId].GetNewPlayer();
            return new JsonResult(new { playerGuid, picturesPerCard });
        }

        [HttpPost]
        public IActionResult Start(string gameId)
        {
            ApplicationManager.GamesManager[gameId].DistributeCards();
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
        public JsonResult Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch)
        {
            var response = ApplicationManager.Touch(gameId, playerGuid, cardPlayed, valueTouch, centerCard, timeTakenToTouch);
            return new JsonResult(response);
        }


    }
}
