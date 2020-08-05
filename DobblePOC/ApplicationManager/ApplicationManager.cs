using DobbleCardsGameLib;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DobblePOC
{
    public class ApplicationManager : IApplicationManager
    {
        public Dictionary<string, GameManager> GamesManager { get; }

        public ApplicationManager() => GamesManager = new Dictionary<string, GameManager>();

        public void FreeGameManager(string gameId) => GamesManager.Remove(gameId);

        public int UseGameManager(string gameId, int picturesNumber = 0)
        {
            if (GamesManager.ContainsKey(gameId))
                return GamesManager[gameId].PicturesNumber;

            GamesManager.Add(gameId, new GameManager(picturesNumber));
            return picturesNumber;
        }
    }
}
