using DobbleCardsGameLib;
using System;
using System.Collections.Generic;

namespace DobblePOC
{
    public interface IApplicationManager
    {
        public Dictionary<string, GameManager> GamesManager { get; }
        public string CreateGameManager(int picturesPerCard, List<string> picturesNames);
        public int JoinGameManager(string gameId);

        void FreeGameManager(string gameId);
        TouchResponse Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch);
    }
}