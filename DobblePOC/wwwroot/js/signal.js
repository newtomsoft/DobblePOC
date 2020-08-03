var ConnectionHubGame;
function CallSignalR() {
    ConnectionHubGame = new signalR.HubConnectionBuilder().withUrl("/hubGame").withAutomaticReconnect().build();
    ConnectionHubGame.start()
        .then(function () { /*SendAddToGame();*/ })
        .catch(function (err) {
            return console.error(err.toString());
        });

    ConnectionHubGame.on("TouchReceive", function (playerId) {
        console.log("receive playerId : " + playerId)
    });
}
