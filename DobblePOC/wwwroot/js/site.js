$(document).ready(async function () {
    CallSignalR();
    Init();


});


var PlayerId = Math.floor((Math.random() * 100) + 1);
var DateEvent = Date.now;

function Init() {
    $('.valueToTouch').click(function () { Touch(this.attributes['value'].value) });
    GetGuidCentralCard();
}