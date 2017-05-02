$(document).ready(function() {
    $("#faqs h1").animate(
        { fontSize: "275%", opacity: .5, left: 0},
        2000
    );
    $("#faqs h2").click(function() {
        $(this).toggleClass("minus");
        if($(this).attr("class") != "minus") {
            $(this).next().slideToggle(1000);
        } else {
            $(this).next().slideDown(1000);
        }
    });

});
