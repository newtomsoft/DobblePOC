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
        static public List<int> LoggedPlayersId { get; set; }
        static private Dictionary<int, List<int>> GameGuid_PlayersId { get; set; }
        static private Dictionary<string, int> ContextId_GameGuid { get; set; }

        //public override Task OnConnectedAsync()
        //{
        //    (LoggedPlayersId ??= new List<int>()).Add(int.Parse(Context.UserIdentifier));
        //    Clients.All.SendAsync("ReceivePlayersLogged", LoggedPlayersId.ToHashSet());
        //    return base.OnConnectedAsync();
        //}

        //public override Task OnDisconnectedAsync(Exception exception)
        //{
        //    int playerId = int.Parse(Context.UserIdentifier);
        //    LoggedPlayersId.Remove(playerId);
        //    Clients.All.SendAsync("ReceivePlayersLogged", LoggedPlayersId.ToHashSet());

        //    if (GameGuid_PlayersId != null)
        //    {
        //        int id = ContextId_GameGuid[Context.ConnectionId];
        //        GameGuid_PlayersId[playerId].Remove(playerId);
        //        Clients.Group(id.ToString()).SendAsync("ReceivePlayersInGame", GameGuid_PlayersId[playerId].ToHashSet());

        //    }
        //    if (ContextId_GameGuid != null)
        //        ContextId_GameGuid.Remove(Context.ConnectionId);

        //    return base.OnDisconnectedAsync(exception);
        //}

        /// <summary>
        /// Envoie l'information que le joueur a une page ouverte sur le jeu
        /// </summary>
        /// <param name="guid">Guid du jeu</param>
        /// <returns></returns>
        //public async Task SendAddToGame(int playerId)
        //{
        //    GameGuid_PlayersId ??= new Dictionary<int, List<int>>();
        //    GameGuid_PlayersId.TryAdd(playerId, new List<int>());
        //    GameGuid_PlayersId[playerId].Add(int.Parse(Context.UserIdentifier));

        //    ContextId_GameGuid ??= new Dictionary<string, int>();
        //    ContextId_GameGuid[Context.ConnectionId] = playerId;

        //    await Groups.AddToGroupAsync(Context.ConnectionId, playerId.ToString());
        //    await Clients.Group(playerId.ToString()).SendAsync("ReceivePlayersInGame", GameGuid_PlayersId[playerId].ToHashSet());
        //}

        public async Task SendStartGame() => await Clients.All.SendAsync("StartGameReceive");

        public async Task SendTouchCard(string playerPseudo, object centerCard) => await Clients.All.SendAsync("TouchCardReceive", playerPseudo, centerCard);

        public async Task SendGameFinished(string playerPseudo) => await Clients.All.SendAsync("GameFinishedReceive", playerPseudo);

    }
}
