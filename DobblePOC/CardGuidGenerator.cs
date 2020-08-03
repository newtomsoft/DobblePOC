using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DobblePOC
{
    public class CardGuidGenerator : ICardGuidGenerator
    {
        private string CardGuid { get; set; }
        public CardGuidGenerator(IConfiguration config)
        {
            CardGuid = Guid.NewGuid().ToString("N");
        }

        public string GetCardGuid()
        {
            return CardGuid;
        }

        public string NewCardGuid()
        {
            CardGuid = Guid.NewGuid().ToString("N");
            return CardGuid;
        }
    }
}
