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

        private bool CardsDistributed { get; set; }
        private DobbleCard CenterCard { get; set; }

        public GameManager()
        {
            PlayersGuids_Cards = new Dictionary<string, (int indexCurrentCard, List<DobbleCard> Cards)>();
            CardsDistributed = false;
        }

        public DobbleCard GetCenterCard() => CenterCard;
        public void SetCenterCard(DobbleCard card) => CenterCard = card;


        public List<DobbleCard> GetCards(string playerGuid) => PlayersGuids_Cards[playerGuid].Cards;

        public DobbleCard GetCurrentCard(string playerGuid) => PlayersGuids_Cards[playerGuid].Cards[PlayersGuids_Cards[playerGuid].indexCurrentCard];

        public int GetCardCurrentIndex(string playerGuid) => PlayersGuids_Cards[playerGuid].indexCurrentCard;

        public bool IncreaseCardsCurrentIndex(string playerGuid)
        {
            var index = PlayersGuids_Cards[playerGuid].indexCurrentCard;
            PlayersGuids_Cards[playerGuid] = (++index, PlayersGuids_Cards[playerGuid].Cards);
            return index == PlayersGuids_Cards[playerGuid].Cards.Count;
        }

        public void AddCardsToGame(List<DobbleCard> cards)
        {
            if (CardsDistributed) return;
            CenterCard = cards[0];
            int cardsNumberPerPlayer = (cards.Count - 1) / PlayersNumber;
            int iCard = 1;
            var guids = PlayersGuids_Cards.Keys.ToList();
            foreach (var guid in guids)
            {
                PlayersGuids_Cards[guid] = (0, cards.GetRange(iCard, cardsNumberPerPlayer));
                iCard += cardsNumberPerPlayer;
            }
            CardsDistributed = true;
        }

        public string GetNewPlayer()
        {
            var playerGuid = Guid.NewGuid().ToString("N");
            PlayersGuids_Cards.Add(playerGuid, (0, new List<DobbleCard>()));
            return playerGuid;
        }
    }
}
