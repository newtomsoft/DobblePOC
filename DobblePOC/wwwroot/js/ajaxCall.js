function Touch() {
    console.log("touch");

    // int playerId, int valueTouch, int indexCentralStack, string guidGame, TimeSpan timeTakenToTouch

    $.ajax({
        url: '/Home/Touch',
        type: 'POST',
        data: { playerId: PlayerId, valueTouch: 5, indexCentralStack: 0, guidGame: "1248", timeTakenToTouch: 500 },
        success: function (data) { CallbackTouch(data); },
    });
}

