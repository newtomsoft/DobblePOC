using System.Collections.Generic;

namespace DobblePOC
{
    public interface IApplicationManager
    {
        public Dictionary<string, GameManager> GamesManager { get; }

        int UseGameManager(string gameId, int picturesNumber = 0);
        void FreeGameManager(string gameId);
    }
}