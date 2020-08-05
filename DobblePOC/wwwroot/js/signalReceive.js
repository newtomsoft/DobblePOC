async function PlayerInGameReceive(pseudos) {
    ShowNewPlayerInGame(pseudos);
}

async function StartGameReceive(centerCard) {
    GetCenterCard(centerCard);
    GetCards();
}

async function TouchCardReceive(pseudo, centerCard) {
    ChangeCenterCard(centerCard);
    ShowCards();
}

async function GameFinishedReceive(pseudo) {
    ShowCards();
    ShowGameFinished(pseudo);
}

