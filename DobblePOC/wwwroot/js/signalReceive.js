function ReceivePlayersStatus(status, playersId) {
    Players.forEach(player => player[status] = false);
    playersId.forEach(id => Players[Players.findIndex(p => p.id == id)][status] = true);
    Contacts.forEach(h => h[status] = false);
    for (const id of playersId) {
        let index = Contacts.findIndex(h => h.id == id);
        if (index != -1)
            Contacts[index][status] = true;
    }
}

async function TouchReceive(playerId) {
    console.log("receive by player " + playerId);
}
