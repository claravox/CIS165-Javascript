$(function() {
    "use strict";
    moveIt("#up", {"top": "-=100px"}, 38);
    moveIt("#left", {"left": "-=100px"}, 37);
    moveIt("#down", {"top": "+=100px"}, 40);
    moveIt("#right", {"left": "+=100px"}, 39);
    $("#directions").next().hide().prev().click(function() {
        /* This might seem confusing. Basically, select the element
        with the id of directions, then go to the next element, hide
        it, then go to the one with the id of directions and listen
        for a click. When it is clicked, toggle open or closed the
        next element. */
        $(this).next().slideToggle();
    });
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
