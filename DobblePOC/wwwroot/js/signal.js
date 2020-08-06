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

//Send
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

//Receive
async function ReceivePlayerInGame(pseudos) {
    ShowNewPlayerInGame(pseudos);
}

async function ReceiveStartGame(centerCard) {
    GetCenterCard(centerCard);
    GetCards();
}

async function ReceiveChangeCenterCard(pseudo, centerCard) {
    ChangeCenterCard(centerCard);
    ShowCards();
    ShowPlayerPutDownCard(pseudo);
}

async function ReceiveGameFinished(pseudo) {
    ShowPlayerPutDownCard(pseudo);
    ShowCards();
    ShowGameFinished(pseudo);
}

