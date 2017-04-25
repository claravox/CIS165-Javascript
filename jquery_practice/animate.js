$(function() {
    "use strict";
    moveIt("#up", {"top": "-=100px"}, 38);
    moveIt("#left", {"left": "-=100px"}, 37);
    moveIt("#down", {"top": "+=100px"}, 40);
    moveIt("#right", {"left": "+=100px"}, 39);
});

function moveIt(id, cssMovement, keypressed) {
    $("body").keydown(function(e) {
        var code = e.which;
        if (code == keypressed) {
                 $(id).css("color", "black").keyup(function(){
                     $(this).css("color", "white");
                 });
                 $("#mona").animate(cssMovement);
       }
   });
   $(id).click(function() {
        $(id).css("color", "black").mouseleave(function(){
            $(this).css("color", "white");
        });
        $("#mona").animate(cssMovement);
    });
}
