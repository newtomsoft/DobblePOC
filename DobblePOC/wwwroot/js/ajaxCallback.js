function CallbackTouch(data) {
    console.log("CallbackTouch");
    if (data === "Ok") {
        console.log("CallbackTouch ok");
        SendTouch();
    }
    else {
        console.log("CallbackTouch ko");
    }  
}
