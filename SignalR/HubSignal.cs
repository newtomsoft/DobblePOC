using DobbleCardsGameLib;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public class HubSignal : Hub
    {
        static private Dictionary<string, List<string>> GameId_Pseudos { get; set; }

        public async Task SendPlayerInGame(string gameId, string pseudo)
        {
            GameId_Pseudos ??= new Dictionary<string, List<string>>();
            GameId_Pseudos.TryAdd(gameId, new List<string>());
            GameId_Pseudos[gameId].Add(pseudo);

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("PlayerInGameReceive", GameId_Pseudos[gameId]);
        }

        public async Task SendStartGame(object centerCard) => await Clients.All.SendAsync("StartGameReceive", centerCard);

        public async Task SendTouchCard(string pseudo, object centerCard) => await Clients.All.SendAsync("TouchCardReceive", pseudo, centerCard);

        public async Task SendGameFinished(string pseudo) => await Clients.All.SendAsync("GameFinishedReceive", pseudo);

    }
}
