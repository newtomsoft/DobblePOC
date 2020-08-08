//Hub Connection
var ConnectionHubGame;
function CallSignalR() {
    ConnectionHubGame = new signalR.HubConnectionBuilder().withUrl("/hubGame").withAutomaticReconnect().build();
    ConnectionHubGame.start().catch(function (err) { return console.error(err.toString()); });
    ConnectionHubGame.on("ReceivePlayersInGame", function (pseudos) { ReceivePlayersInGame(pseudos); });
    ConnectionHubGame.on("ReceiveAdditionalDeviceInGame", function (additionalDevices) { ReceiveAdditionalDeviceInGame(additionalDevices); });
    ConnectionHubGame.on("ReceiveStartGame", function (centerCard, picturesNames) { ReceiveStartGame(centerCard, picturesNames); });
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


function SendStartGame(centerCard, picturesNames) {
    ConnectionHubGame.invoke("HubStartGame", GameId, centerCard, picturesNames).catch(function (err) { return console.error(err.toString()); });
}

function SendChangeCenterCard(centerCard) {
    ConnectionHubGame.invoke("HubChangeCenterCard", GameId, ThisPseudo, centerCard).catch(function (err) { return console.error(err.toString()); });
};

function SendGameFinished() {
    ConnectionHubGame.invoke("HubGameFinished", GameId, ThisPseudo).catch(function (err) { return console.error(err.toString()); });
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

async function ReceiveStartGame(centerCard, picturesNames) {
    PicturesNames = picturesNames;
    GetCenterCard(centerCard);
    if (ThisPlayerGuid !== undefined) {
        GetCardsPlayer();
        CountDecounter = 3;
        DomAddDecounter();
        TimerBeforeLunchGame = setInterval(function () { DecounterLunchGame(); }, 1000);
    }
    else {
        $('#startGame').hide();
        $('#startGameWait').hide();
        PrepareCenterCard();
        PreparePlayersInfos();
        ShowPlayersInfos();
    }
}

async function ReceiveChangeCenterCard(pseudo, centerCard) {
    ChangeCenterCard(centerCard);
    PrepareCards();
    ShowCards()
    ShowPlayerPutDownCard(pseudo);
}

async function ReceiveGameFinished(pseudo) {
    ShowPlayerPutDownCard(pseudo);
    PrepareCards();
    ShowCards()
    ShowGameFinished(pseudo);
}

