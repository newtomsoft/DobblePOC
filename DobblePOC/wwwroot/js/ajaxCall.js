function JoinGame(method) {
    if (method !== 1 && method !== 2) {
        console.error('mode de jeu non paramétré à create ou join')
        return;
    }
    if (method === 1) { // create
        PicturesNumberPerCard = $('#picturesNumber').val();
        Pseudo = $('#pseudoCreateGame').val();
    }
    else if (method === 2) { //join
        GameId = $('#gameIdJoinGame').val();
        Pseudo = $('#pseudoJoinGame').val();
    }
    $.ajax({
        url: '/Game/Join',
        type: 'POST',
        data: { gameId: GameId, joinMethod: method, picturesNumber: PicturesNumberPerCard },
        success: function (data) { CallbackJoinGame(data); },
    });
}

function AddNewPlayer() {
    $.ajax({
        url: '/Game/AddNewPlayer',
        type: 'POST',
        data: { gameId: GameId },
        success: function (data) { CallbackAddNewPlayer(data); },
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