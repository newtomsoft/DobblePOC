using DobbleCardsGameLib;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;


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
            => View();

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
            string additionalDevice = ApplicationManager.GamesManager[gameId].GetNewDevice();
            return new JsonResult(new { additionalDevice, picturesPerCard });
        }

        [HttpPost]
        public JsonResult Start(string gameId)
        {
            ApplicationManager.GamesManager[gameId].DistributeCards();
            var centerCard = ApplicationManager.GamesManager[gameId].CenterCard;
            var picturesNames = ApplicationManager.GamesManager[gameId].PicturesNames;
            return new JsonResult(new { centerCard, picturesNames });
        }

        [HttpGet]
        public JsonResult GetCardsPlayer(string gameId, string playerGuid)
            =>   new JsonResult(ApplicationManager.GamesManager[gameId].GetCards(playerGuid));

        [HttpGet]
        public JsonResult GetCenterCard(string gameId)
            => new JsonResult(ApplicationManager.GamesManager[gameId].CenterCard);

        [HttpPost]
        public JsonResult Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch)
            =>  new JsonResult(ApplicationManager.Touch(gameId, playerGuid, cardPlayed, valueTouch, centerCard, timeTakenToTouch));

        private List<string> GetRandomPicturesNames(int picturesNumber)
        {
            var fullNames = Directory.GetFiles(Path.Combine(WebHostEnvironment.WebRootPath, "pictures", "cardPictures")).OrderBy(_ => Guid.NewGuid()).Take(picturesNumber).ToList();
            //var filesNames = new List<string>();
            //fullNames.ForEach(fullName => filesNames.Add(Path.GetFileName(fullName)));


            return fullNames.Select(fullName => Path.GetFileName(fullName)).ToList();

            //return filesNames;
        }

        private string AddNewPlayer(string gameId)
            => ApplicationManager.GamesManager[gameId].GetNewPlayer();
    }
}
