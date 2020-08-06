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

