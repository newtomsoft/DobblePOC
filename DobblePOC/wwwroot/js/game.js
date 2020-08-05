$(document).ready(async function () {
    CallSignalR();
    Init();
});

var GameId;
var Pseudo;
var PseudosInGame = [];
var PlayerCards;
var PicturesNumberPerCard;
var PlayerGuid;
var CenterCard;
var DateEvent;

function Init() {
    $('#joinGameForm').submit(function () { JoinGame("join"); });
    $('#createGameForm').submit(function () { JoinGame("create"); });
    $('#startGame').click(function () { StartGame(); });
    ShowHideSections();
}

function PictureClickSubscribe() {
    $('.pictureClick').click(function () { TouchCard(this.attributes['value'].value); });
}

function PictureClickUnsubscribe() {
    $('.pictureClick').off("click");
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
    if (PicturesNumberPerCard === undefined) {
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
    $('#playerCardPicture').html("");
    let playerPicture = '';
    for (let i = 0; i < PicturesNumberPerCard; i++)
        playerPicture += `<button id="playerCardPicture${i}" class="img-picture img-${PlayerCards[0].values[i]} pictureClick" value="${PlayerCards[0].values[i]}"></button>`;

    $(playerPicture).appendTo('#playerCardPicture');
    PictureClickSubscribe();
    $('#playerCardPicture').show();
}

function HidePlayerCard() {
    for (var i = 0; i < PicturesNumberPerCard; i++) {
        $(`#cardPicture${i}`).hide();
    }
    $('#playerCardPicture').hide();
}

function ShowCenterCard() {
    $('#centerCardPicture').html("");
    let centerPicture = '';
    for (let i = 0; i < PicturesNumberPerCard; i++)
        centerPicture += `<button id="centerCardPicture${i}" class="img-picture cursor-default img-${CenterCard.values[i]}" value="${CenterCard.values[i]}"></button>`;

    $(centerPicture).appendTo('#centerCardPicture');
    $('#centerCardPicture').show();
}

function HideCenterCard() {
    for (let i = 0; i < PicturesNumberPerCard; i++)
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
    //todo show popup
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
    for (let i = 0; i < 6; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
}

function SetGameInfos(gameId, pseudo, picturesNumber) {
    PicturesNumberPerCard = picturesNumber;
    GameId = gameId;
    Pseudo = pseudo;
    ShowGameIdInfo();
}

function ShowGameIdInfo() {
    if (PlayerGuid == "")
        $('#gameIdInfo').html(`<h3>la partie n° ${GameId} n'est plus disponible</h3>`);
    $('#gameIdInfo').html(`<h3>Partie n° ${GameId}</h3>`);
}

function LoadAllCardPictures() {
    let totalPicturesNumber = PicturesNumberPerCard * PicturesNumberPerCard - PicturesNumberPerCard + 1;
    for (var i = 58; i < totalPicturesNumber; i++) {
        jQuery.get(window.location.href + `/Pictures/CardPictures/${i}.svg`)
    }
}
