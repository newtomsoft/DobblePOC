function TouchCard(valueTouch) {
    console.log("touch");
    $.ajax({
        url: '/Game/Touch',
        type: 'POST',
        data: { gameId: GameId, playerGuid: PlayerGuid, cardPlayed: PlayerCards[0], valueTouch: valueTouch, centerCard: CenterCard, guidGame: "1248", timeTakenToTouch: 500 },
        success: function (data) { CallbackTouch(data); },
    });
    HidePlayerCard();
}

function GetCenterCard() {
    $.ajax({
        url: '/Game/GetCenterCard',
        data: { gameId: GameId },
        success: function (data) { CallbackGetCenterCard(data); },
    });

}

function GetNewPlayerGuid() {
    $.ajax({
        url: '/Game/GetNewPlayerGuid',
        data: { gameId: GameId },
        success: function (guid) { CallbackGetNewPlayerGuid(guid); },
    });
}

function StartGame() {
    $.ajax({
        url: '/Game/StartGame',
        data: { gameId: GameId },
        success: function () { CallbackStartGame(); },
    });
}

function GetCards() {
    $.ajax({
        url: '/Game/GetCardsPlayer',
        data: { gameId: GameId, playerGuid: PlayerGuid },
        success: function (data) { CallbackGetCards(data); },
    });
}