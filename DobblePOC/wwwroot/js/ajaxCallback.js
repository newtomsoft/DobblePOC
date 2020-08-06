function CallbackJoinGame(data) {
    GameId = data.gameId;
    SendPlayerInGame();
    ShowHideSections();
    AddNewPlayer();
}

function CallbackTouch(data) {
    if (data.status === 1) { // status ok
        PictureClickSubscribe();
        ChangePlayerCard();
        SendTouchCard(data.centerCard);
    }
    else if (data.status === 2) {// game finished
        SendGameFinished(Pseudo);
    }
    else {
        let delayInMilliseconds = 2000;
        setTimeout(function () { PictureClickSubscribe(); }, delayInMilliseconds);
    }
}

function CallbackGetCenterCard(data) {
    CenterCard = data;
}

function CallbackAddNewPlayer(data) {
    PlayerGuid = data.playerGuid;
    PicturesNumberPerCard = data.picturesNumber;
    LoadAllCardPictures();
    ShowGameIdInfo();
}

function CallbackStartGame(centerCard) {
    SendStartGame(centerCard);
}

function CallbackGetCards(data) {
    PlayerCards = data;
    ShowCards();
}