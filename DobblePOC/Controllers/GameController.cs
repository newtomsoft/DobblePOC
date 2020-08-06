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
        private const int GAME_ID_LENGTH = 4;

        private IApplicationManager ApplicationManager { get; }

        public GameController(IApplicationManager applicationManager) => ApplicationManager = applicationManager;

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Join(string gameId, GameJoinMethod joinMethod, int picturesNumber)
        {
            if (joinMethod == GameJoinMethod.Create)
                gameId = RandomId();

            ApplicationManager.UseGameManager(gameId, joinMethod, picturesNumber);
            return new JsonResult(new { gameId });
        }

        [HttpPost]
        public JsonResult AddNewPlayer(string gameId)
        {
            int picturesNumber = ApplicationManager.UseGameManager(gameId);
            string playerGuid = ApplicationManager.GamesManager[gameId].GetNewPlayer();
            return new JsonResult(new { playerGuid, picturesNumber });
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

        private static string RandomId()
        {
            const string src = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var sb = new StringBuilder();
            Random Random = new Random();
            for (var i = 0; i < GAME_ID_LENGTH; i++)
            {
                var c = src[Random.Next(0, src.Length)];
                sb.Append(c);
            }
            return sb.ToString();
        }
    }
}
