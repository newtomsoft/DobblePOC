async function StartGameReceive() {
    console.log("StartGameReceive");
    GetCenterCard();
    GetCards();
}

async function TouchCardReceive(playerPseudo, centerCard) {
    console.log("receive by player " + playerPseudo);
    ChangeCenterCard(centerCard);
    ShowCards();
}

async function GameFinishedReceive(playerPseudo) {
    ShowCards();
    ShowGameFinished(playerPseudo);
}