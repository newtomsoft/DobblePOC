using DobbleCardsGameLib;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DobblePOC
{
    public class GameManager
    {
        public Dictionary<string, (int indexCurrentCard, List<DobbleCard> Cards)> PlayersGuids_Cards { get; private set; }
        public int PlayersNumber { get => PlayersGuids_Cards.Count; }
        public int PicturesPerCard { get; }
        public List<string> PicturesNames { get; private set; }
        public object GameManagerLock { get; } = new object();

        private bool GameInProgress { get; set; }
        private bool GameFinished { get; set; }
        public DobbleCard CenterCard { get; set; }

        public GameManager(int picturesNumber, List<string> picturesNames)
        {
            PlayersGuids_Cards = new Dictionary<string, (int indexCurrentCard, List<DobbleCard> Cards)>();
            GameInProgress = false;
            PicturesPerCard = picturesNumber;
            PicturesNames = picturesNames;
        }

        public void SetGameFinished() => GameFinished = true;

        public List<DobbleCard> GetCards(string playerGuid) => PlayersGuids_Cards[playerGuid].Cards;

        public DobbleCard GetCurrentCard(string playerGuid) => PlayersGuids_Cards[playerGuid].Cards[PlayersGuids_Cards[playerGuid].indexCurrentCard];

        public int GetCardCurrentIndex(string playerGuid) => PlayersGuids_Cards[playerGuid].indexCurrentCard;

        public bool IncreaseCardsCurrentIndex(string playerGuid)
        {
            var index = PlayersGuids_Cards[playerGuid].indexCurrentCard;
            PlayersGuids_Cards[playerGuid] = (++index, PlayersGuids_Cards[playerGuid].Cards);
            return index == PlayersGuids_Cards[playerGuid].Cards.Count;
        }

        public void DistributeCards()
        {
            if (GameInProgress) return;
            GameInProgress = true;
            var cards = new DobbleCardsGame(PicturesPerCard).Cards;
            CenterCard = cards[0];
            int cardsNumberPerPlayer = (cards.Count - 1) / PlayersNumber;
            var guids = PlayersGuids_Cards.Keys.ToList();
            for (int i = 0; i < guids.Count; i++)
                PlayersGuids_Cards[guids[i]] = (0, cards.GetRange(1 + i * cardsNumberPerPlayer, cardsNumberPerPlayer));
        }

        public string GetNewPlayer()
        {
            if (GameInProgress || GameFinished)
                return string.Empty;

            var playerGuid = Guid.NewGuid().ToString("N");
            PlayersGuids_Cards.Add(playerGuid, (0, new List<DobbleCard>()));
            return playerGuid;
        }

        public string GetNewDevice()
        {
            if (GameInProgress || GameFinished)
                return string.Empty;

            return Guid.NewGuid().ToString("N");
        }
    }
}
