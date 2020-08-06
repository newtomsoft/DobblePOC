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

        public int UseGameManager(string gameId, GameJoinMethod joinMethod = GameJoinMethod.Join, int picturesNumber = 0)
        {
            if (joinMethod == GameJoinMethod.Join && GamesManager.ContainsKey(gameId))
                return GamesManager[gameId].PicturesNumber;

            GamesManager.Add(gameId, new GameManager(picturesNumber));
            return picturesNumber;
        }

        public TouchResponse Touch(string gameId, string playerGuid, DobbleCard cardPlayed, int valueTouch, DobbleCard centerCard, TimeSpan timeTakenToTouch)
        {
            lock (GamesManager[gameId].GameManagerLock)
            {
                if (cardPlayed != GamesManager[gameId].GetCurrentCard(playerGuid))
                    return new TouchResponse { Status = TouchStatus.CardPlayedDontExist };

                if (centerCard != GamesManager[gameId].GetCenterCard())
                    return new TouchResponse { Status = TouchStatus.ToLate };

                if (centerCard.Values.Any(value => value == valueTouch))
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
    }
}
