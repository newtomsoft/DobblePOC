$(document).ready(async function () {
    CallSignalR();
    Init();
});

var GameId;
var Pseudo;
var PseudosInGame = [];
var PlayerCards;
var PicturesNumber;
var PlayerGuid;
var CenterCard;
var DateEvent;

function Init() {
    $('#joinGameForm').submit(function () { JoinGame("join"); });
    $('#createGameForm').submit(function () { JoinGame("create"); });
    //$('.pictureClick').click(function () { TouchCard(this.attributes['value'].value); });
    $('#startGame').click(function () { StartGame(); });
    ShowHideSections();
}

function ShowHideSections() {
    if (Pseudo === undefined || GameId === undefined) {
        HideGameSection();
        ShowWelcomeSection();
    }
    else {
        HideWelcomeSection();
        ShowGameSection();
    }
}

function ShowWelcomeSection() {
    $("#createJoinGameSection").show();
}

function HideWelcomeSection() {
    $("#createJoinGameSection").hide();
}

function ShowGameSection() {
    if (PicturesNumber === undefined) {
        $('#startGame').hide();
        $('#startGameWait').show();
    }
    else {
        $('#startGameWait').hide();
        $('#startGame').show();
    }
    $("#gameSection").show();
}

function HideGameSection() {
    $("#gameSection").hide();
}

function ShowCards() {
    ShowPlayerCard();
    ShowCenterCard();
    ShowOpponentsCards();
}

function HideCards() {
    HidePlayerCard();
    HideCenterCard();
    HideOpponentsCards();
}

function ShowPlayerCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        $(`#playerCardPicture${i}`).attr('value', PlayerCards[0].values[i]);
        $(`#playerCardPicture${i}`).html(PlayerCards[0].values[i]);
        $(`#playerCardPicture${i}`).show();

        $('#cardsNumber').html(PlayerCards.length)
    }
    $('#playerCardPicture').show();
}

function HidePlayerCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        $(`#cardPicture${i}`).hide();
    }
    $('#playerCardPicture').hide();
}

function ShowCenterCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        $(`#centerCardPicture${i}`).attr('value', CenterCard.values[i]);
        $(`#centerCardPicture${i}`).html(CenterCard.values[i]);
        $(`#centerCardPicture${i}`).show();
    }
    $('#centerCardPicture').show();
}

function HideCenterCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) 
        $(`#centerCardPicture${i}`).hide();
    $('#centerCardPicture').hide();
}

function ShowOpponentsCards() {
    //todo
}

function HideOpponentsCards() {
    //todo
}

function ChangePlayerCard() {
    PlayerCards = PlayerCards.slice(1);
}

function ShowGameFinished(winnerPseudo) {
    alert("game won by" + winnerPseudo);
}

function ChangeCenterCard(card) {
    CenterCard = card;
}

function ShowNewPlayerInGame(pseudos) {
    PseudosInGame = pseudos;
    let pseudosString = [];
    PseudosInGame.forEach(pseudo => pseudosString.push(pseudo + "   "))
    $('#pseudos').html(pseudosString);
}

function GenerateGameId() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 6; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
}

function SetGameInfos(gameId, pseudo, picturesNumber) {
    PicturesNumber = picturesNumber;
    GameId = gameId;
    Pseudo = pseudo;
    ShowGameIdInfo();
}

function ShowGameIdInfo() {
    if (PlayerGuid == "")
        $('#gameIdInfo').html(`<h3>la partie n° ${GameId} n'est plus disponible</h3>`);
    $('#gameIdInfo').html(`<h3>Partie n° ${GameId}</h3>`);
}

function InitCardPictures() {
    let centerPicture = '';
    let playerPicture = '';
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        centerPicture += `<button id="centerCardPicture${i}" class="btn-outline-info" value="${i}"></button>`;
        playerPicture += `<button id="playerCardPicture${i}" class="btn-outline-info pictureClick" value="${i}"></button>`;
    }
    $(centerPicture).appendTo('#centerCardPicture');
    $(playerPicture).appendTo('#playerCardPicture');
    $('.pictureClick').click(function () { TouchCard(this.attributes['value'].value); });
}