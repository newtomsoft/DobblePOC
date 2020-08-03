$(document).ready(async function () {
    CallSignalR();



});


var PlayerId = Math.floor((Math.random() * 100) + 1);
var DateEvent = Date.now;

function UpdateClickRun() {
    $('[run]').css('cursor', 'pointer');
    $('[run]:not([tip])').off("click");
    $('[run]:not([tip])').click(function () { Run(this.attributes['run'].value); });
    $('[run][tip]').off("click");
    $('[run][tip]').click(function () { if (!ShowTip(this.attributes['tip'].value)) Run(this.attributes['run'].value); });
}