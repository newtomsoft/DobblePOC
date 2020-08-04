using DobbleCardsGameLib;
using System.Collections.Generic;

namespace DobblePOC
{
    public interface IApplicationManager
    {
        public Dictionary<string, GameManager> GamesManager { get; }

        void UseGameManager(string gameId);
    }
}