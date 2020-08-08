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

        public Dictionary<string, GameManager> GamesManager { get; }

        public ApplicationManager() => GamesManager = new Dictionary<string, GameManager>(); // appelé par l'injecteur de dépendance

        public void FreeGameManager(string gameId) => GamesManager.Remove(gameId);

        public string CreateGameManager(int picturesPerCard, List<string> picturesNames)
        {
            string gameId = RandomId();
            GamesManager.Add(gameId, new GameManager(picturesPerCard, picturesNames));
            return gameId;
        }

        public int JoinGameManager(string gameId)
        {
            if (GamesManager.ContainsKey(gameId))
                return GamesManager[gameId].PicturesPerCard;
            else
                return 0;
        }

        public TouchResponse Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch)
        {
            lock (GamesManager[gameId].GameManagerLock)
            {
                if (cardPlayed != GamesManager[gameId].GetCurrentCard(playerGuid))
                    return new TouchResponse { Status = TouchStatus.CardPlayedDontExist };

                if (centerCard != GamesManager[gameId].GetCenterCard())
                    return new TouchResponse { Status = TouchStatus.ToLate };

                if (centerCard.PicturesIds.Any(value => value == valueTouch))
                {
                    GamesManager[gameId].SetCenterCard(cardPlayed);
                    if (GamesManager[gameId].IncreaseCardsCurrentIndex(playerGuid))
                    {
                        FreeGameManager(gameId);
                        return new TouchResponse { Status = TouchStatus.TouchOkAndGameFinish };
                    }
                    centerCard = GamesManager[gameId].GetCenterCard();
                    return new TouchResponse { Status = TouchStatus.TouchOk, CenterCard = centerCard };

                }
                return new TouchResponse { Status = TouchStatus.WrongValueTouch };
            }
        }
        private static string RandomId()
        {
            const string src = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
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
