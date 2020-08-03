function CallbackTouch(data) {
    console.log("CallbackTouch");
    if (data.answerStatus === 1) {
        CentraleCardGuid = data.cardGuid;
        console.log("CallbackTouch ok new card guid : " + CentraleCardGuid);
        SendTouch();
    }
    else if (data.answerStatus === 2) {
        console.log("Wrong value touched");
    }
    else {
        console.log("To Late");
    }
}

function CallbackGetGuidCentralCard(guid) {
    CentraleCardGuid = guid;
}