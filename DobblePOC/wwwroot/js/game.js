$(document).ready(async function () {
    CallSignalR();
    Init();
});

var GameId;
var Pseudo;
var PseudosInGame = [];
var PlayerCards;
var PicturesPerCard;
var PlayerGuid;
var CenterCard;
var DateEvent;

function Init() {
    $('#createGameForm').submit(function () { CreateGame(1); }); //todo remplacer 1 par enum c# passé en var
    $('#joinGameForm').submit(function () { JoinGame(2); }); //todo remplacer 2 par enum c# passé en var
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
    if (PicturesPerCard === undefined) {
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
    for (let i = 0; i < PicturesPerCard; i++)
        playerPicture += `<button id="playerCardPicture${i}" class="img-picture img-${PlayerCards[0].values[i]} pictureClick" value="${PlayerCards[0].values[i]}"></button>`;

    $(playerPicture).appendTo('#playerCardPicture');
    PictureClickSubscribe();
    $('#cardsNumber').html(`Il vous reste : ${PlayerCards.length} cartes`);
    $('#playerCardPicture').show();

}

function HidePlayerCard() {
    for (var i = 0; i < PicturesPerCard; i++) {
        $(`#cardPicture${i}`).hide();
    }
    $('#playerCardPicture').hide();
}

function ShowCenterCard() {
    $('#centerCardPicture').html("");
    let centerPicture = '';
    for (let i = 0; i < PicturesPerCard; i++)
        centerPicture += `<button id="centerCardPicture${i}" class="img-picture cursor-default img-${CenterCard.values[i]}" value="${CenterCard.values[i]}"></button>`;

    $(centerPicture).appendTo('#centerCardPicture');
    $('#centerCardPicture').show();
}

function HideCenterCard() {
    for (let i = 0; i < PicturesPerCard; i++)
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

function ShowGameFinished(winner) {
    const pseudosRankings = PseudosInGame.sort(ComparePseudosCardsNumber);

    let text = '';
    pseudosRankings.forEach(item => text += item.pseudo + " a " + item.cardsNumber + " carte(s)\n");

    alert(`Partie gagnée par ${winner}\n${text}`);
    //todo show popup
}

function ChangeCenterCard(card) {
    CenterCard = card;
}

function ShowNewPlayerInGame(pseudos) {
    PseudosInGame = [];
    pseudos.forEach(pseudo => PseudosInGame.push({ pseudo : pseudo, cardsNumber : 0}))
    let pseudosString = [];
    PseudosInGame.forEach(item => pseudosString.push(item.pseudo + " "))
    $('#pseudos').html(pseudosString);
}

function ShowGameIdInfo() {
    if (PlayerGuid == "")
        $('#gameIdInfo').html(`<h3>la partie n° ${GameId} n'est plus disponible</h3>`);
    $('#gameIdInfo').html(`<h3>Partie n° ${GameId}</h3>`);
}

function LoadAllCardPictures() {
    let totalPicturesNumber = PicturesPerCard * PicturesPerCard - PicturesPerCard + 1;
    for (var i = 58; i < totalPicturesNumber; i++) {
        jQuery.get(window.location.href + `/Pictures/CardPictures/${i}.svg`)
    }
}

function InitPlayersInfos() {
    PseudosInGame.forEach(item => item.cardsNumber = PlayerCards.length);
}

function ShowPlayersInfos() {
    let pseudosString = [];
    PseudosInGame.forEach(item => pseudosString.push(`${item.pseudo} (${item.cardsNumber}) `));
    $('#pseudos').html(pseudosString);
}

function ShowPlayerPutDownCard(pseudo) {
    const indexFound = PseudosInGame.findIndex(item => item.pseudo == pseudo);
    PseudosInGame[indexFound].cardsNumber--;
    ShowPlayersInfos();
}

function ComparePseudosCardsNumber(pseudo1, pseudo2) {
    return pseudo1.cardsNumber - pseudo2.cardsNumber;
}
