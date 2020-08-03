//function SendAddToGame() {
//    ConnectionHubGame.invoke("SendAddToGame", ClientId).catch(function (err) { return console.error(err.toString()); });
//};

function SendTouch() {
    ConnectionHubGame.invoke("SendTouch", PlayerId).catch(function (err) { return console.error(err.toString()); }); 
};

