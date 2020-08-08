$(document).ready(async function () {
    Url = new URL(window.location.href);
    GameId = Url.searchParams.get("game");
    if (GameId !== null)
        ModeInvitGame = true;
    CallSignalR();
    Init();
});

var Url
var ModeInvitGame
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
var PicturesNames = [];
var IntervalDecounterLunchGame;
var Decounter;

function Init() {
    $('#createGameForm').submit(function () { CreateGame(); });
    $('#joinGameForm').submit(function () { JoinGame(); });
    $('#invitGameForm').submit(function () { InvitGame(); });
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
        HideInvitGameSection();
        ShowGameSection(mode);
    }
    else if (ModeInvitGame !== undefined) {
        ModeInvitGame = undefined;
        HideGameSection();
        HideWelcomeSection();
        ShowInvitGameSection();
    }
    else if (ThisPseudo === undefined || GameId === null) {
        HideGameSection();
        HideInvitGameSection();
        ShowWelcomeSection();
    }
    else {
        HideWelcomeSection();
        HideInvitGameSection();
        ShowGameSection(mode);
    }
}

function ShowInvitGameSection() {
    $('#invitGameSectionTitle').html(`Rejoindre la partie ${GameId}`);
    $("#invitGameSection").show();
}

function HideInvitGameSection() {
    $("#invitGameSection").hide();
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
    else if (PseudosInGame[0].pseudo !== ThisPseudo) {
        $('#startGame').hide();
        $('#startGameWait').html(`<b>En attente du lancement de la partie par ${PseudosInGame[0].pseudo}</b>`);
        $('#startGameWait').show();
    }
    else {
        $('#startGame').show();
        $('#startGameWait').hide();
    }
    $("#gameSection").show();
}

function HideGameSection() {
    $("#gameSection").hide();
}

function PrepareCards() {
    PrepareCenterCard();
    PrepareOpponentsCards();
    if (ThisAdditionalDevice === undefined) {
        PreparePlayerCard();
    }
}

function ShowCards() {
    ShowCenterCard();
    ShowOpponentsCards();
    if (ThisAdditionalDevice === undefined) {
        ShowPlayerCard();
    }
}

function ShowCenterCard() {
    $('#centerCardPicture').show();
}

function ShowOpponentsCards() {
    //todo
}

function ShowPlayerCard() {
    $('#playerCardPicture').show();
}

function HideCards() {
    HidePlayerCard();
    HideCenterCard();
    HideOpponentsCards();
}

function PreparePlayerCard() {
    $('#playerCardPicture').html("");
    let playerPicture = '';
    for (let i = 0; i < PicturesPerCard; i++) {
        let url = Url.href.replace(Url.search, '');
        let picturePathName = `${url}/pictures/cardPictures/${PicturesNames[PlayerCards[0].picturesIds[i]]}`;
        playerPicture += `<button id="playerCardPicture${i}" class="img-picture pictureClick" style="background-image: url(${picturePathName})" value="${PlayerCards[0].picturesIds[i]}"></button>`;
    }
    $(playerPicture).appendTo('#playerCardPicture');
    PictureClickSubscribe();
    $('#cardsNumber').html(`Il vous reste : ${PlayerCards.length} cartes`);
}

function HidePlayerCard() {
    for (var i = 0; i < PicturesPerCard; i++) {
        $(`#cardPicture${i}`).hide();
    }
    $('#playerCardPicture').hide();
}

function PrepareCenterCard() {
    $('#centerCardPicture').html("");
    let centerPicture = '';
    for (let i = 0; i < PicturesPerCard; i++) {
        let url = Url.href.replace(Url.search, '');
        let picturePathName = `${url}/pictures/cardPictures/${PicturesNames[CenterCard.picturesIds[i]]}`;
        centerPicture += `<button id="centerCardPicture${i}" class="img-picture cursor-default" style="background-image: url(${picturePathName})" value="${CenterCard.picturesIds[i]}"></button>`;
    }
    $(centerPicture).appendTo('#centerCardPicture');
}

function HideCenterCard() {
    for (let i = 0; i < PicturesPerCard; i++)
        $(`#centerCardPicture${i}`).hide();
    $('#centerCardPicture').hide();
}

function PrepareOpponentsCards() {
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
        $('#gameIdInfo').html(`<h3>La partie n° ${GameId} n'est plus disponible</h3>`);
    let url = Url
    if (url.searchParams.get("game" === null))
        url.searchParams.append('game', GameId);
    else
        url.searchParams.set('game', GameId);
    $('#gameIdInfo').html(`<h3>Partie n° <a href="${url.href}">${GameId}</a></h3>`);
}

function PreloadAllCardPictures() {
    let totalPicturesNumber = PicturesPerCard * PicturesPerCard - PicturesPerCard + 1;
    let url = Url.href.replace(Url.search, '');
    for (var i = 0; i < totalPicturesNumber; i++) {
        jQuery.get(url + `/pictures/cardPictures/${PicturesNames[i]}`)
    }
}

function PreparePlayersInfos() {
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

function LunchGame() {
    PrepareCards();
    PreparePlayersInfos();
    ShowCards();
    ShowPlayersInfos();
}

function DecounterLunchGame() {
    ShowDecounter(Decounter);
    if (Decounter === 0) {
        DomFlashDecounter();
        setTimeout(function () { DomRemoveDecounter(); }, 1200);
        clearInterval(IntervalDecounterLunchGame);
        LunchGame();
    }
    Decounter--;
}

function ShowDecounter(countNumber) {
    $('#decounter').removeClass();
    $('#decounter').addClass(`decounter${countNumber}`);
}

function DomAddDecounter() {
    $('<div id="decounter"></div>').appendTo('#gameSection');
}

function DomFlashDecounter() {
    for (let i = 0; i < 15; i++) {
        $('#decounter').fadeToggle(70, function () {
            $(this).fadeToggle(70);
        });
    }
}

function DomRemoveDecounter() {
    $('#decounter').remove();
}