using DobbleCardsGameLib;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DobblePOC
{
    public class ApplicationManager : IApplicationManager
    {
        public Dictionary<string, GameManager> GamesManager { get; }

        public ApplicationManager()
        {
            GamesManager = new Dictionary<string, GameManager>();
        }

        public void UseGameManager(string gameId)
        {
            if (GamesManager.ContainsKey(gameId))
                return;

            GamesManager.Add(gameId, new GameManager());
        }
    }
}
