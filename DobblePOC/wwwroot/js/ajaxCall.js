function CreateGame() {
    PicturesPerCard = $('#picturesNumber').val();
    Pseudo = $('#pseudoCreateGame').val();
    $.ajax({
        url: '/Game/Create',
        type: 'POST',
        data: { picturesPerCard: PicturesPerCard },
        success: function (data) { CallbackCreateOrJoinGame(data, "create"); },
    });
}

function JoinGame() {
    GameId = $('#gameIdJoinGame').val().toUpperCase();
    Pseudo = $('#pseudoJoinGame').val();
    $.ajax({
        url: '/Game/Join',
        type: 'POST',
        data: { gameId: GameId },
        success: function (data) { CallbackCreateOrJoinGame(data, "join"); },
    });
}

function StartGame() {
    $.ajax({
        url: '/Game/Start',
        type: 'POST',
        data: { gameId: GameId },
        success: function (centerCard) { CallbackStartGame(centerCard); },
    });
}

function GetCenterCard(card) {
    if (card === undefined)
        $.ajax({
            url: '/Game/GetCenterCard',
            data: { gameId: GameId },
            success: function (data) { CallbackGetCenterCard(data); },
        });
    else
        CenterCard = card;
}

function GetCards() {
    $.ajax({
        url: '/Game/GetCardsPlayer',
        data: { gameId: GameId, playerGuid: PlayerGuid },
        success: function (data) { CallbackGetCards(data); },
    });
}

function TouchCard(valueTouch) {
    PictureClickUnsubscribe();
    $.ajax({
        url: '/Game/Touch',
        type: 'POST',
        data: { gameId: GameId, playerGuid: PlayerGuid, cardPlayed: PlayerCards[0], valueTouch: valueTouch, centerCard: CenterCard/*, timeTakenToTouch: 500*/ },
        success: function (data) { CallbackTouch(data); },
    });
}