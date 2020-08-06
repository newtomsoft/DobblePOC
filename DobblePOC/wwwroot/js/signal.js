var ConnectionHubGame;
function CallSignalR() {
    ConnectionHubGame = new signalR.HubConnectionBuilder().withUrl("/hubGame").withAutomaticReconnect().build();
    ConnectionHubGame.start()
        .then(function () { })
        .catch(function (err) {
            return console.error(err.toString());
        });

    ConnectionHubGame.on("ReceivePlayerInGame", function (pseudos) {
        ReceivePlayerInGame(pseudos);
    });

    ConnectionHubGame.on("ReceiveStartGame", function (centerCard) {
        ReceiveStartGame(centerCard);
    });

    ConnectionHubGame.on("ReceiveChangeCenterCard", function (pseudo, centerCard) {
        ReceiveChangeCenterCard(pseudo, centerCard);
    });

    ConnectionHubGame.on("ReceiveGameFinished", function (pseudo) {
        ReceiveGameFinished(pseudo);
    });
}
