//Hub Connection
var ConnectionHubGame;
function CallSignalR() {
    ConnectionHubGame = new signalR.HubConnectionBuilder().withUrl("/hubGame").withAutomaticReconnect().build();
    ConnectionHubGame.start().catch(function (err) { return console.error(err.toString()); });
    ConnectionHubGame.on("ReceivePlayersInGame", function (pseudos) { ReceivePlayersInGame(pseudos); });
    ConnectionHubGame.on("ReceiveAdditionalDeviceInGame", function (additionalDevices) { ReceiveAdditionalDeviceInGame(additionalDevices); });
    ConnectionHubGame.on("ReceiveStartGame", function (centerCard) { ReceiveStartGame(centerCard); });
    ConnectionHubGame.on("ReceiveChangeCenterCard", function (pseudo, centerCard) { ReceiveChangeCenterCard(pseudo, centerCard); });
    ConnectionHubGame.on("ReceiveGameFinished", function (pseudo) { ReceiveGameFinished(pseudo); });
}

//Send
function SendPlayerInGame() {
    ConnectionHubGame.invoke("HubPlayerInGame", GameId, ThisPseudo).catch(function (err) { return console.error(err.toString()); });
};

function SendAdditionalDeviceInGame() {
    ConnectionHubGame.invoke("HubAdditionalDeviceInGame", GameId, ThisAdditionalDevice).catch(function (err) { return console.error(err.toString()); });
};


function SendStartGame(centerCard) {
    ConnectionHubGame.invoke("HubStartGame", centerCard).catch(function (err) { return console.error(err.toString()); });
}

function SendChangeCenterCard(centerCard) {
    ConnectionHubGame.invoke("HubChangeCenterCard", ThisPseudo, centerCard).catch(function (err) { return console.error(err.toString()); });
};

function SendGameFinished() {
    ConnectionHubGame.invoke("HubGameFinished", ThisPseudo).catch(function (err) { return console.error(err.toString()); });
};

//Receive
async function ReceivePlayersInGame(pseudos) {
    ShowPlayersInGame(pseudos);
}

async function ReceiveAdditionalDeviceInGame(additionalDevices) {
    AdditionalDevices = additionalDevices;
    $('#centerCard').hide();
    //ShowAdditionalDevicesInGame(additionalDevices);

    //todo autre chose ?
}

async function ReceiveStartGame(centerCard) {
    GetCenterCard(centerCard);
    if (ThisPlayerGuid !== undefined)
        GetCards();
    else {
        $('#startGame').hide();
        $('#startGameWait').hide();
        ShowCenterCard();
        InitPlayersInfos();
        ShowPlayersInfos();
    }
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

