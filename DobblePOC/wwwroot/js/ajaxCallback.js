function CallbackJoinGame() {
    SendPlayerInGame();
    ShowHideSections();
    AddNewPlayer();
}

function CallbackTouch(data) {
    if (data.answerStatus === 1) {
        if (data.gameFinish === true) {
            SendGameFinished(Pseudo);
        }
        else {
            ChangePlayerCard();
            SendTouchCard(data.centerCard);
        }
    }
    else if (data.answerStatus === 2) {
        ShowPlayerCard();
    }
    else {
        ShowPlayerCard();
    }
}

function CallbackGetCenterCard(data) {
    CenterCard = data;
}

function CallbackAddNewPlayer(data) {
    PlayerGuid = data.playerGuid;
    PicturesNumber = data.picturesNumber;
}

function CallbackStartGame(centerCard) {
    SendStartGame(centerCard);
}

function CallbackGetCards(data) {
    PlayerCards = data;
    InitCardPictures();
    ShowCards();
}