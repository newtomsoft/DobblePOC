function CallbackTouch(data) {
    console.log("CallbackTouch");
    if (data.answerStatus === 1) {
        if (data.gameFinish === true) {
            SendGameFinished(PlayerPseudo);
        }
        else {
            ChangePlayerCard();
            SendTouchCard(data.centerCard);
        }
    }
    else if (data.answerStatus === 2) {
        console.log("Wrong value touched");
        ShowPlayerCard();
    }
    else {
        console.log("To Late");
        alert("trop tard !");
        ShowPlayerCard();
    }
}

function CallbackGetCenterCard(data) {
    CenterCard = data;
}

function CallbackGetNewPlayerGuid(guid) {
    PlayerGuid = guid;
}

function CallbackStartGame() {
    SendStartGame();
}

function CallbackGetCards(data) {
    PlayerCards = data;
    ShowCards();
}