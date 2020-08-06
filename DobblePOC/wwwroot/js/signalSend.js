function SendPlayerInGame() {
    ConnectionHubGame.invoke("HubPlayerInGame", GameId, Pseudo).catch(function (err) { return console.error(err.toString()); });
};

function SendStartGame(centerCard) {
    ConnectionHubGame.invoke("HubStartGame", centerCard).catch(function (err) { return console.error(err.toString()); });
}

function SendChangeCenterCard(centerCard) {
    ConnectionHubGame.invoke("HubChangeCenterCard", Pseudo, centerCard).catch(function (err) { return console.error(err.toString()); }); 
};

function SendGameFinished() {
    ConnectionHubGame.invoke("HubGameFinished", Pseudo).catch(function (err) { return console.error(err.toString()); });
};

