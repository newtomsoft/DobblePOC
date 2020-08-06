function CallbackCreateGame(data) {
    GameId = data.gameId;
    SendPlayerInGame();
    ShowHideSections();
    AddNewPlayer();
}

function CallbackJoinGame(data) {
    PicturesPerCard = data.picturesPerCard;
    SendPlayerInGame();
    ShowHideSections();
    AddNewPlayer();
}

function CallbackTouch(data) {
    if (data.status === 1) { // status ok
        PictureClickSubscribe();
        ChangePlayerCard();
        SendChangeCenterCard(data.centerCard);
    }
    else if (data.status === 2) {// game finished
        SendGameFinished(Pseudo);
    }
    else {
        let delayInMilliseconds = 1000;
        setTimeout(function () { PictureClickSubscribe(); }, delayInMilliseconds);
    }
}

function CallbackGetCenterCard(data) {
    CenterCard = data;
}

function CallbackAddNewPlayer(data) {
    PlayerGuid = data.playerGuid;
    PicturesPerCard = data.picturesPerCard;
    LoadAllCardPictures();
    ShowGameIdInfo();
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