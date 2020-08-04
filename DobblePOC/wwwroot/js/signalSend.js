//function SendAddToGame() {
//    ConnectionHubGame.invoke("SendAddToGame", ClientId).catch(function (err) { return console.error(err.toString()); });
//};

function SendTouchCard(centerCard) {
    ConnectionHubGame.invoke("SendTouchCard", PlayerPseudo, centerCard).catch(function (err) { return console.error(err.toString()); }); 
};

function SendStartGame() {
    ConnectionHubGame.invoke("SendStartGame").catch(function (err) { return console.error(err.toString()); }); 
}

function SendGameFinished() {
    ConnectionHubGame.invoke("SendGameFinished", PlayerPseudo).catch(function (err) { return console.error(err.toString()); });
};

