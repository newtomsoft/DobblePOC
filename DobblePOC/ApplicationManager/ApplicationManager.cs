using DobbleCardsGameLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DobblePOC
{
    public class ApplicationManager : IApplicationManager
    {
        private const int GAME_ID_LENGTH = 4;

        public Dictionary<string, GameManager> GamesManager { get; } = new Dictionary<string, GameManager>();

        public void FreeGameManager(string gameId) => GamesManager.Remove(gameId);

        public int JoinGameManager(string gameId) => GamesManager.ContainsKey(gameId) ? GamesManager[gameId].PicturesPerCard : 0;

        public string CreateGameManager(int picturesPerCard, List<string> picturesNames)
        {
            FreeOldGameManager();
            string gameId = RandomId();
            GamesManager.Add(gameId, new GameManager(picturesPerCard, picturesNames));
            return gameId;
        }

        public TouchResponse Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch)
        {
            lock (GamesManager[gameId].GameManagerLock)
            {
                if (cardPlayed != GamesManager[gameId].GetCurrentCard(playerGuid))
                    return new TouchResponse(TouchStatus.CardPlayedDontExist);

                if (centerCard != GamesManager[gameId].CenterCard)
                    return new TouchResponse(TouchStatus.ToLate);

                if (centerCard.PicturesIds.Any(value => value == valueTouch))
                {
                    GamesManager[gameId].CenterCard = cardPlayed;
                    if (GamesManager[gameId].IncreaseCardsCurrentIndex(playerGuid))
                    {
                        FreeGameManager(gameId);
                        return new TouchResponse(TouchStatus.TouchOkAndGameFinish);
                    }
                    return new TouchResponse(TouchStatus.TouchOk, GamesManager[gameId].CenterCard);

                }
                return new TouchResponse(TouchStatus.WrongValueTouch);
            }
        }
        private static string RandomId()
        {
            const string src = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
            Random Rand = new Random();
            var sb = new StringBuilder();
            for (var i = 0; i < GAME_ID_LENGTH; i++)
                sb.Append(src[Rand.Next(0, src.Length)]);
            return sb.ToString();
        }

        private void FreeOldGameManager()
        {
            // Method intentionally left empty.
        }
    }
}
