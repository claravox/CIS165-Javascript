$(document).ready(function() {
    $("#plus-sign").hover(function() {
        $(this).childern().text("+").show();
    }).mouseout(function() {
        $(this).childern().hide();
    });

});
