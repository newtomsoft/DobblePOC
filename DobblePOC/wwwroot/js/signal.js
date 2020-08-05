var ConnectionHubGame;
function CallSignalR() {
    ConnectionHubGame = new signalR.HubConnectionBuilder().withUrl("/hubGame").withAutomaticReconnect().build();
    ConnectionHubGame.start()
        .then(function () { })
        .catch(function (err) {
            return console.error(err.toString());
        });

    ConnectionHubGame.on("PlayerInGameReceive", function (pseudos) {
        PlayerInGameReceive(pseudos);
    });

    ConnectionHubGame.on("StartGameReceive", function (centerCard) {
        StartGameReceive(centerCard);
    });

    ConnectionHubGame.on("TouchCardReceive", function (pseudo, centerCard) {
        TouchCardReceive(pseudo, centerCard);
    });

    ConnectionHubGame.on("GameFinishedReceive", function (pseudo) {
        GameFinishedReceive(pseudo);
    });
}
