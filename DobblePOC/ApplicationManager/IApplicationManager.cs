using DobbleCardsGameLib;
using System;
using System.Collections.Generic;

namespace DobblePOC
{
    public interface IApplicationManager
    {
        public Dictionary<string, GameManager> GamesManager { get; }

        int UseGameManager(string gameId, GameJoinMethod joinMethod = GameJoinMethod.Join, int picturesNumber = 0);
        void FreeGameManager(string gameId);
        TouchResponse Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch);
    }
}