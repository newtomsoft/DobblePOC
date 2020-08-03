function Touch(valueTouch) {
    console.log("touch");
    $.ajax({
        url: '/Home/Touch',
        type: 'POST',
        data: { playerId: PlayerId, valueTouch: valueTouch, cardGuid: CentraleCardGuid, guidGame: "1248", timeTakenToTouch: 500 },
        success: function (data) { CallbackTouch(data); },
    });
}

function GetGuidCentralCard() {
    $.ajax({
        url: '/Home/GetGuidCentralCard',
        data: { playerId: PlayerId },
        success: function (guid) { CallbackGetGuidCentralCard(guid); },
    });

}
