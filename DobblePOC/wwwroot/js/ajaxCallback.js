function CallbackJoinGame() {
    SendPlayerInGame();
    ShowHideSections();
    AddNewPlayer();
}

function CallbackTouch(data) {
    if (data.answerStatus === 1) { // status ok
        if (data.gameFinish === true) {
            SendGameFinished(Pseudo);
        }
        else {
            PictureClickSubscribe();
            ChangePlayerCard();
            SendTouchCard(data.centerCard);
        }
    }
    //else if (data.answerStatus === 2) { //status wrong picture
    //    let delayInMilliseconds = 2000;
    //    setTimeout(function () { PictureClickSubscribe(); }, delayInMilliseconds);
    //}
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
}

function CallbackStartGame(centerCard) {
    SendStartGame(centerCard);
}

function CallbackGetCards(data) {
    PlayerCards = data;
    ShowCards();
}