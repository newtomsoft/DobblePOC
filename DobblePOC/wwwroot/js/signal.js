var ConnectionHubGame;
function CallSignalR() {
    ConnectionHubGame = new signalR.HubConnectionBuilder().withUrl("/hubGame").withAutomaticReconnect().build();
    ConnectionHubGame.start()
        .then(function () { /*SendAddToGame();*/ })
        .catch(function (err) {
            return console.error(err.toString());
        });

    ConnectionHubGame.on("StartGameReceive", function () {
        StartGameReceive();
    });

    ConnectionHubGame.on("TouchCardReceive", function (playerPseudo, centerCard) {
        TouchCardReceive(playerPseudo, centerCard);
    });

    ConnectionHubGame.on("GameFinishedReceive", function (playerPseudo) {
        GameFinishedReceive(playerPseudo);
    });
}
