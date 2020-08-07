﻿using DobbleCardsGameLib;
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
        static private Dictionary<string, List<string>> GameId_AdditionalDevices { get; set; }

        public async Task HubPlayerInGame(string gameId, string pseudo)
        {
            GameId_Pseudos ??= new Dictionary<string, List<string>>();
            GameId_Pseudos.TryAdd(gameId, new List<string>());
            GameId_Pseudos[gameId].Add(pseudo);
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("ReceivePlayersInGame", GameId_Pseudos[gameId]);
        }

        public async Task HubAdditionalDeviceInGame(string gameId, string additionalDevice)
        {
            GameId_AdditionalDevices ??= new Dictionary<string, List<string>>();
            GameId_AdditionalDevices.TryAdd(gameId, new List<string>());
            GameId_AdditionalDevices[gameId].Add(additionalDevice);
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Group(gameId).SendAsync("ReceivePlayersInGame", GameId_Pseudos[gameId]);
            await Clients.OthersInGroup(gameId).SendAsync("ReceiveAdditionalDeviceInGame", GameId_AdditionalDevices[gameId]);
        }

        public async Task HubStartGame(object centerCard) => await Clients.All.SendAsync("ReceiveStartGame", centerCard);

        public async Task HubChangeCenterCard(string pseudo, object centerCard) => await Clients.All.SendAsync("ReceiveChangeCenterCard", pseudo, centerCard);

        public async Task HubGameFinished(string pseudo) => await Clients.All.SendAsync("ReceiveGameFinished", pseudo);

    }
}
