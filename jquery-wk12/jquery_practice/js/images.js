$(document).ready(function() {
    $("#image_list a").click(changePic);
    $("#yooo").animate({
        fontSize: "30px",
        color: "#1B81BC",
        paddingBottom: "20px"
    }, 2000).animate({
        color: "#00485A",
    }, 2000);
});

function changePic(event) {
    //This makes sure only one picture has a frame at a time.
    $("#image_list a").removeClass("minus");
    var imageUrl = $(this).attr("href");
    $("#main_image").attr("src", imageUrl);

    var caption = $(this).attr("title");
    $("#caption").text(caption);

    $("li:first-child a").focus();
    $(this).toggleClass("minus");

    event.preventDefault();
};
