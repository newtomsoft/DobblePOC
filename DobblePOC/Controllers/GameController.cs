using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using DobbleCardsGameLib;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace DobblePOC.Controllers
{
    public class GameController : Controller
    {
        private IApplicationManager ApplicationManager { get; }
        private IWebHostEnvironment WebHostEnvironment { get; }

        public GameController(IApplicationManager applicationManager, IWebHostEnvironment webHostEnvironment)
        {
            ApplicationManager = applicationManager;
            WebHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(int picturesPerCard)
        {
            var picturesNames = GetRandomPicturesNames(picturesPerCard * picturesPerCard - picturesPerCard + 1);
            string gameId = ApplicationManager.CreateGameManager(picturesPerCard, picturesNames);
            string playerGuid = AddNewPlayer(gameId);
            return new JsonResult(new { gameId, playerGuid, picturesPerCard });
        }

        [HttpPost]
        public IActionResult Join(string gameId)
        {
            int picturesPerCard = ApplicationManager.JoinGameManager(gameId);
            string playerGuid = AddNewPlayer(gameId);
            return new JsonResult(new { gameId, playerGuid, picturesPerCard });
        }

        [HttpPost]
        public JsonResult JoinAsAdditionalDevice(string gameId)
        {
            int picturesPerCard = ApplicationManager.JoinGameManager(gameId);
            string additionalDevice = ApplicationManager.GamesManager[gameId].GetCenterCardsDevice();
            return new JsonResult(new { additionalDevice, picturesPerCard });
        }

        [HttpPost]
        public JsonResult Start(string gameId)
        {
            ApplicationManager.GamesManager[gameId].DistributeCards();
            var centerCard = ApplicationManager.GamesManager[gameId].GetCenterCard();
            var picturesNames = ApplicationManager.GamesManager[gameId].PicturesNames;
            return new JsonResult(new { centerCard, picturesNames });
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

        private string AddNewPlayer(string gameId) => ApplicationManager.GamesManager[gameId].GetNewPlayer();

        public List<string> GetRandomPicturesNames(int picturesNumber)
        {
            var fullNames = Directory.GetFiles(Path.Combine(WebHostEnvironment.WebRootPath, "pictures", "cardPictures")).OrderBy(_ => Guid.NewGuid()).Take(picturesNumber).ToList();
            var filesNames = new List<string>();
            fullNames.ForEach(fullName => filesNames.Add(Path.GetFileName(fullName)));
            return filesNames;

        }
    }
}
