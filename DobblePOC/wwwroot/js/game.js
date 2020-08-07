$(document).ready(async function () {
    CallSignalR();
    Init();
});

var GameId;
var ThisPseudo;
var PseudosInGame = [];
var ThisAdditionalDevice;
var AdditionalDevices = [];
var PlayerCards;
var PicturesPerCard;
var ThisPlayerGuid;
var CenterCard;
var DateEvent;


function Init() {
    $('#createGameForm').submit(function () { CreateGame(); });
    $('#joinGameForm').submit(function () { JoinGame(); });
    $('#joinGameAsAdditionalDeviceForm').submit(function () { JoinGameAsAdditionalDevice(); });
    $('#startGameButton').click(function () { StartGame(); });
    ShowOrHideSections();
}

function PictureClickSubscribe() {
    $('.pictureClick').click(function () { TouchCard(this.attributes['value'].value); });
}

function PictureClickUnsubscribe() {
    $('.pictureClick').off("click");
}

function ShowOrHideSections(mode) {
    if (mode === "additionalDevice") {
        HideWelcomeSection();
        ShowGameSection(mode);
    }
    else if (ThisPseudo === undefined || GameId === undefined) {
        HideGameSection();
        ShowWelcomeSection();
    }
    else {
        HideWelcomeSection();
        ShowGameSection(mode);
    }
}

function ShowWelcomeSection() {
    $("#createJoinGameSection").show();
}

function HideWelcomeSection() {
    $("#createJoinGameSection").hide();
}

function ShowGameSection(mode) {
    if (mode === "additionalDevice") {
        $('#startGame').hide();
        $('#startGameWait').hide();
        $('#playerCard').hide();
    }
    else if (mode === "join") {
        $('#startGame').hide();
        $('#startGameWait').show();
    }
    else if (mode === "create") {
        $('#startGame').show();
        $('#startGameWait').hide();
    }
    $("#gameSection").show();
}

function HideGameSection() {
    $("#gameSection").hide();
}

function ShowCards() {
    if (ThisAdditionalDevice === undefined)
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

function ShowPlayersInGame(pseudos) {
    PseudosInGame = [];
    pseudos.forEach(pseudo => PseudosInGame.push({ pseudo: pseudo, cardsNumber: 0 }))
    let pseudosString = [];
    PseudosInGame.forEach(item => pseudosString.push(item.pseudo + " "))
    $('#pseudos').html('<h4>Joueurs présents:</h4>' + pseudosString);
}

function ShowGameIdInfo() {
    if (ThisPlayerGuid == "")
        $('#gameIdInfo').html(`<h3>la partie n° ${GameId} n'est plus disponible</h3>`);
    $('#gameIdInfo').html(`<h3>Partie n° ${GameId}</h3>`);
}

function PreloadAllCardPictures() {
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
    if (ThisAdditionalDevice !== undefined)
        PseudosInGame.forEach(item => pseudosString.push(`${item.pseudo} (${item.cardsNumber}) `));
    else
        PseudosInGame.forEach(item => pseudosString.push(`${item.pseudo} `)); // todo temp en attendant de recevoir le nombre de carte
    $('#pseudos').html('<h4>Joueurs présents:</h4>' + pseudosString);
}

function ShowPlayerPutDownCard(pseudo) {
    const indexFound = PseudosInGame.findIndex(item => item.pseudo == pseudo);
    PseudosInGame[indexFound].cardsNumber--;
    ShowPlayersInfos();
}

function ComparePseudosCardsNumber(pseudo1, pseudo2) {
    return pseudo1.cardsNumber - pseudo2.cardsNumber;
}

function ShowAdditionalDevicesInGame(additionalDevices) {

}