$(document).ready(async function () {
    CallSignalR();
    Init();


});

var GameId = "3XBC7";
var PlayerPseudo = "Thomas"; //todo supprimer
var PlayerCards;
var PlayerGuid;
var CenterCard;
var DateEvent;

function Init() {
    $('.valueToTouch').click(function () { TouchCard(this.attributes['value'].value) });
    $('#startGame').click(function () { StartGame() });
    GetNewPlayerGuid();
}

function ShowCards() {
    ShowPlayerCard();
    ShowCenterCard();
    ShowOpponentsCards();
}

function ShowPlayerCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        $(`#card${i}`).attr('value', PlayerCards[0].values[i]);
        $(`#card${i}`).html(PlayerCards[0].values[i]);
        $(`#card${i}`).show();
        $('#cardsNumber').html(PlayerCards.length)
    }
}

function HidePlayerCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        $(`#card${i}`).hide();
    }
}

function ShowCenterCard() {
    for (var i = 0; i < PlayerCards[0].values.length; i++) {
        $(`#centerCard${i}`).attr('value', CenterCard.values[i]);
        $(`#centerCard${i}`).html(CenterCard.values[i]);
        $(`#centerCard${i}`).show();
    }
}

function ShowOpponentsCards() {
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