function SendPlayerInGame() {
    ConnectionHubGame.invoke("SendPlayerInGame", GameId, Pseudo).catch(function (err) { return console.error(err.toString()); });
};

function SendStartGame(centerCard) {
    ConnectionHubGame.invoke("SendStartGame", centerCard).catch(function (err) { return console.error(err.toString()); });
}

function SendTouchCard(centerCard) {
    ConnectionHubGame.invoke("SendTouchCard", Pseudo, centerCard).catch(function (err) { return console.error(err.toString()); }); 
};

function SendGameFinished() {
    ConnectionHubGame.invoke("SendGameFinished", Pseudo).catch(function (err) { return console.error(err.toString()); });
};

