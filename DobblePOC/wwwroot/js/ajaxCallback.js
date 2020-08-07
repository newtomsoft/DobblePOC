function CallbackCreateOrJoinGame(data, mode) {
    GameId = data.gameId;
    PicturesPerCard = data.picturesPerCard;
    SendPlayerInGame();
    ShowOrHideSections(mode);
    ThisPlayerGuid = data.playerGuid;
    PreloadAllCardPictures();
    ShowGameIdInfo();
}

function CallbackJoinGameAsAdditionalDevice(data) {
    ThisAdditionalDevice = data.additionalDevice;
    PicturesPerCard = data.picturesPerCard;
    SendAdditionalDeviceInGame();
    ShowOrHideSections("additionalDevice");
    PreloadAllCardPictures();
}

function CallbackTouch(data) {
    if (data.status === 1) { // status ok
        PictureClickSubscribe();
        ChangePlayerCard();
        SendChangeCenterCard(data.centerCard);
    }
    else if (data.status === 2) {// game finished
        SendGameFinished(ThisPseudo);
    }
    else {
        let delayInMilliseconds = 1000;
        setTimeout(function () { PictureClickSubscribe(); }, delayInMilliseconds);
    }
}

function CallbackGetCenterCard(data) {
    CenterCard = data;
}

function CallbackStartGame(centerCard) {
    SendStartGame(centerCard);
}

function CallbackGetCards(data) {
    PlayerCards = data;
    $('#startGame').hide();
    $('#startGameWait').hide();
    ShowCards();
    InitPlayersInfos();
    ShowPlayersInfos();
}